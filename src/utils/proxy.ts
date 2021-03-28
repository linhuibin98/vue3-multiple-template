const effectMap = new Map()
let arr = []
// 保存已经代理的对象
const proxyCache = new Map()

window.proxyCache = proxyCache as any

export function reactive(obj: Record<string, any>) {

  if (proxyCache.has(obj)) {
    return proxyCache.get(obj)
  }
  
  function reactivity(obj) {
    const proxy = new Proxy(obj, {
      get: (target, prop, receiver) => {
        let value = Reflect.get(target, prop, receiver)
        if (typeof value === 'object') {
          value = reactivity(target[prop])
        }
        arr.push([target, prop])
        return value
      },
      set: (target, prop, value, receiver) => {
        console.log('监听设置')
        console.log('target', target)
        console.log('prop', prop)
        console.log('value', value)
        return Reflect.set(target, prop, value, receiver)
      }
    })

    proxyCache.set(obj, proxy)

    return proxy
  }

  return reactivity(obj)
}

export function effect(callback) {
  arr = []
  callback()
  for (const key in arr) {
    const [obj, prop] = arr[key]
    if (proxyCache.has(obj)) {
      // proxyCache.get(obj).get(prop).push()
    }
  }
} 