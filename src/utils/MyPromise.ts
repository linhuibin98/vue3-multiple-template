export type ResolveType = (data: any) => void
export type RejectType = (err: any) => void
export type ExecutorType = (resolve: ResolveType, reject: RejectType) => void
enum StatusEnum {
  pending = 'PENDING',
  fulfilled = 'FULFILLED',
  rejected = 'REJECTED',
}

export class MyPromise {
  __status__ = StatusEnum.pending
  resolveQueue: ResolveType[] = []
  rejectQueue: RejectType[] = []
  resolveReturnList: any[] = []

  constructor(executor: ExecutorType) {
    const resolve: ResolveType = (data?) => {
      /*
      *  如果调用 resolve
      *   __status__ 改为 fulfilled 状态
      *   调用 resolveQueue 队列函数
      * */
      setTimeout(() => {
        if (this.isPending()) {
          this.__status__ = StatusEnum.fulfilled
          for (let fn of this.resolveQueue) {
            this.resolveReturnList.push(fn(data))
          }
        }
      }, 0)
    }
    const reject: RejectType = (err) => {
      /*
      *  如果调用 reject
      *   __status__ 改为 rejected 状态
      *   调用 rejectQueue 队列函数
      * */
      setTimeout(() => {
        if (this.isPending()) {
          this.__status__ = StatusEnum.rejected
          for (let fn of this.rejectQueue) {
            fn(err)
          }
        }
      }, 0)
    }
    executor(resolve, reject)
  }

  isPending() {
    return this.__status__ === StatusEnum.pending
  }

  then(onFulfilled: ResolveType, onRejected?: RejectType) {
    // 当 promise的状态为 pending
    if (this.isPending()) {
      console.log('inner then1', 1)
      onFulfilled && this.resolveQueue.push(onFulfilled)
      onRejected && this.rejectQueue.push(onRejected)
    }
    return new MyPromise((resolve, reject) => {
      resolve(this.resolveReturnList[this.resolveReturnList.length-1])
    })
  }

  catch(onRejected: RejectType) {
    if (this.isPending()) {
      onRejected && this.rejectQueue.push(onRejected)
    }
  }

  static resolve(data?: any) {
    if (data instanceof MyPromise) {
      return data
    }
    return new MyPromise((resolve, reject) => {
      resolve(data)
    })
  }

  static reject(data?: any) {
    return new MyPromise((resolve, reject) => {
      reject(data)
    })
  }

  static all(promiseArr: any[]) {
    const promises = Array.from(promiseArr)
    const num = promises.length
    let count = 0
    let resolvedValue = new Array(num)

    return new MyPromise((resolve, reject) =>{
      for (const item of promises) {
        MyPromise.resolve(item).then((res) => {
          console.log(count, res)
          resolvedValue[count++] = res
          if(count === num){
            resolve(resolvedValue)
          }
        }).catch((err) => {
          reject(err)
        })
      }
    })
  }
}

window.MyPromise = MyPromise