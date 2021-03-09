/**
 * 函数柯里化
*/
export const curring = (fn: (...rest: any[]) => any, ...args: any[]) => {
  const length = fn.length
  return (...rests: any[]) => {
    const argArr = [...args, ...rests]

    if (argArr.length < length) {
      return curring(fn, ...argArr)
    }
    return fn(...argArr)
  }
}