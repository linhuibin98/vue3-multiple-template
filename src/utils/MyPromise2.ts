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

export class MyPromise {
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
  *
  * */
  then(onFulfilled: ResolveType, onRejected?: RejectType) {
    setTimeout(() => {
      if (this.isPending()) {
        onFulfilled && this.onFulfilledCallbacks.push(onFulfilled)
        onRejected && this.onRejectedCallbacks.push(onRejected)
      }
      if (this.isFulfilled()) {
        onFulfilled(this.value)
      }
      if (this.isRejected()) {
        onFulfilled(this.reason)
      }
    }, 0)
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