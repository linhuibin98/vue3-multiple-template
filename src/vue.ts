function defineReactive(obj: any, key: string | number | symbol, value: any) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(): any {
      console.log('获取了')
      return value;
    },
    set(v: any) {
      if (v === value) {
        return;
      }
      console.log('设置了')
      value = v;
    }
  })
}

// test defineReactive
const obj = {
  a: 1,
  b: {
    c: 2
  }
}

defineReactive(obj, 'a', obj['a']);

obj.a

obj.a = 2;



