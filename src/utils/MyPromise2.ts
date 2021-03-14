/*
 * @author: linhuibin
 * @date: 2021-03-11 13:59:44
 * @lastEditTime: 2021-03-11 14:09:43
 * @lastEditors: linhuibin
 * @description: 
 * @filePath: \server-RCg:\projects\vue3-multiple-template\src\utils\MyPromise2ts
 */
export type ResolveType = (data: any) => void
export type RejectType = (err: any) => void
export type ExecutorType = (resolve: ResolveType, reject: RejectType) => void
enum StatusEnum {
  pending = 'PENDING',
  fulfilled = 'FULFILLED',
  rejected = 'REJECTED',
}

function resolvePromise(promise2, x, resolve, reject) {
  // 1. 返回值 x 不能 等于 promise2，会造成循环引用
  if (x === promise2) {
    return reject(new TypeError('error !!! x === promise2'))
  }
  // 2. x 为 promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false // 表示只能调取一次 resolve 或 reject
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, r => {
          if (called) return;
          called = true
          // r可能还是一个promise, 递归解析r
          resolvePromise(promise2, r, resolve, reject)
        }, e => {
          if (called) return;
          called = true
          reject(e)
        })
      } else { // x 为普通值，直接resolve成功
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true
      reject(e)
    }

  } else {  // 3. x 为普通值，直接resolve成功
    resolve(x)
  }
}

export class MyPromise {
  static deferred
  __status__: StatusEnum = StatusEnum.pending
  value: any = undefined
  reason: any = undefined
  onFulfilledCallbacks: ResolveType[] = []
  onRejectedCallbacks: RejectType[] = []
  /*
  *  resolve
  * 状态改为 fulfilled, 执行 onFulfilledCallbacks事件池
  * */
  resolve(value?: any) {
    if (this.isPending()) {
      this.__status__ = StatusEnum.fulfilled
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => fn(value))
    }
  }
  /*
  *  reject
  * 状态改为 reason, 执行 onRejectedCallbacks
  * */
  reject(reason?: any) {
    if (this.isPending()) {
      this.__status__ = StatusEnum.rejected
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn(reason))
    }
  }

  constructor(executor: ExecutorType) {
    // 监听 executor 是否 异常， 若是则直接 reject
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }
  /*
  * then 内部为异步执行, 用setTimeout(fn ,0)
  * 返回一个新Promise实例, 获取onFulfilled 或 onRejected 返回值x
  * 
  * 
  * resolvePromise(promise2, x, resolve, reject)
  * 此时promise2可能是undefined, 所以加一个异步，确保拿到promise2
  * */
  then(onFulfilled?: ResolveType, onRejected?: RejectType) {
    // onFulfilled、onRejected为可选参数，必须是一个function, 不是则给一个默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.isPending()) {
        onFulfilled && this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        onRejected && this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
      if (this.isFulfilled()) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.isRejected()) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
    })
    return promise2
  }

  catch(onRejected: RejectType) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.isPending()) {
        onRejected && this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
      if (this.isRejected()) {
        console.log('catch', 'catch3')
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
    })
    return promise2
  }

  isPending() {
    return this.__status__ === StatusEnum.pending
  }
  isFulfilled() {
    return this.__status__ === StatusEnum.fulfilled
  }
  isRejected() {
    return this.__status__ === StatusEnum.rejected
  }
}
export interface deferredType {
  promise: MyPromise,
  resolve: RejectType,
  reject: RejectType
}
MyPromise.deferred = (): deferredType => {
  const dfd: deferredType = {
    promise: null,
    resolve: null,
    reject: null
  }
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

// promise 测试工具 npm i promises-aplus-tests -g
// promises-aplus-tests promise.js