// 保存已经代理的对象
const proxyCache = new Map()
// effect 保存依赖关系
const effectMap = new Map()
// 保存依赖列表
let usedReactivity: any[] = []

/*
*  vue reactive toy
* */
export function reactive(obj: Record<string, any>) {
  /*
  *  判断 该对象是否已经 proxy, 是则 直接从内存中返回
  * */
  if (proxyCache.has(obj)) {
    return proxyCache.get(obj)
  }

  const proxy = new Proxy(obj, {
    get: (target, prop, receiver) => {
      console.log('拦截获取值', {...target}, prop)
      /*
      *  1. 拦截获取的值
      * */
      let value = Reflect.get(target, prop, receiver)
      /*
      *  2. 判断是否为 object， 是 则递归 proxy
      * */
      if (typeof value === 'object') {
        value = reactive(value)
      }
      usedReactivity.push([target, prop])
      return value
    },
    set: (target, prop, value, receiver) => {
      const val = Reflect.set(target, prop, value, receiver)
      /*
      *  获取effect依赖，如果存在，执行 该依赖的 callback
      * */
      if (effectMap.has(obj)) {
        if (effectMap.get(obj).has(prop)) {
          for (const callback of effectMap.get(obj).get(prop)) {
            callback()
          }
        }
      }
      return val
    }
  })
  /*
  *  将代理的对象 存入缓存中
  * */
  proxyCache.set(obj, proxy)

  return proxy
}


export function effect(callback: () => void) {
  /*
  *  1. 先清空 之前依赖数组
  * */
  usedReactivity = []
  /*
  *  2. 执行回调函数， 收集依赖
  * */
  callback()
  /*
  *  3. 将收集的依赖， 存入 effectMap中
  * */
  for (const key in usedReactivity) {
    const [obj, prop] = usedReactivity[key]
    if (!effectMap.has(obj)) {
      effectMap.set(obj, new Map())
    }
    if (!effectMap.get(obj).has(prop)) {
      effectMap.get(obj).set(prop, [])
    }
    effectMap.get(obj).get(prop).push(callback)
  }
} 