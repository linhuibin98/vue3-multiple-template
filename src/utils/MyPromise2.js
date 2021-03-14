"use strict";
exports.__esModule = true;
exports.MyPromise = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["pending"] = "PENDING";
    StatusEnum["fulfilled"] = "FULFILLED";
    StatusEnum["rejected"] = "REJECTED";
})(StatusEnum || (StatusEnum = {}));
function resolvePromise(promise2, x, resolve, reject) {
    // 1. 返回值 x 不能 等于 promise2，会造成循环引用
    if (x === promise2) {
        return reject(new TypeError('error !!! x === promise2'));
    }
    // 2. x 为 promise
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        var called_1 = false; // 表示只能调取一次 resolve 或 reject
        try {
            var then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (r) {
                    if (called_1)
                        return;
                    called_1 = true;
                    // r可能还是一个promise, 递归解析r
                    resolvePromise(promise2, r, resolve, reject);
                }, function (e) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(e);
                });
            }
            else { // x 为普通值，直接resolve成功
                resolve(x);
            }
        }
        catch (e) {
            if (called_1)
                return;
            called_1 = true;
            reject(e);
        }
    }
    else { // 3. x 为普通值，直接resolve成功
        resolve(x);
    }
}
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        this.__status__ = StatusEnum.pending;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        // 监听 executor 是否 异常， 若是则直接 reject
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (e) {
            this.reject(e);
        }
    }
    /*
    *  resolve
    * 状态改为 fulfilled, 执行 onFulfilledCallbacks事件池
    * */
    MyPromise.prototype.resolve = function (value) {
        if (this.isPending()) {
            this.__status__ = StatusEnum.fulfilled;
            this.value = value;
            this.onFulfilledCallbacks.forEach(function (fn) { return fn(value); });
        }
    };
    /*
    *  reject
    * 状态改为 reason, 执行 onRejectedCallbacks
    * */
    MyPromise.prototype.reject = function (reason) {
        if (this.isPending()) {
            this.__status__ = StatusEnum.rejected;
            this.reason = reason;
            this.onRejectedCallbacks.forEach(function (fn) { return fn(reason); });
        }
    };
    /*
    * then 内部为异步执行, 用setTimeout(fn ,0)
    * 返回一个新Promise实例, 获取onFulfilled 或 onRejected 返回值x
    *
    *
    * resolvePromise(promise2, x, resolve, reject)
    * 此时promise2可能是undefined, 所以加一个异步，确保拿到promise2
    * */
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        // onFulfilled、onRejected为可选参数，必须是一个function, 不是则给一个默认函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) { return data; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (e) { throw e; };
        var promise2 = new MyPromise(function (resolve, reject) {
            if (_this.isPending()) {
                onFulfilled && _this.onFulfilledCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                onRejected && _this.onRejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
            if (_this.isFulfilled()) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.isRejected()) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
        });
        return promise2;
    };
    MyPromise.prototype["catch"] = function (onRejected) {
        var _this = this;
        var promise2 = new MyPromise(function (resolve, reject) {
            if (_this.isPending()) {
                onRejected && _this.onRejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
            if (_this.isRejected()) {
                console.log('catch', 'catch3');
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
        });
        return promise2;
    };
    MyPromise.prototype.isPending = function () {
        return this.__status__ === StatusEnum.pending;
    };
    MyPromise.prototype.isFulfilled = function () {
        return this.__status__ === StatusEnum.fulfilled;
    };
    MyPromise.prototype.isRejected = function () {
        return this.__status__ === StatusEnum.rejected;
    };
    return MyPromise;
}());
MyPromise.deferred = function () {
    var dfd = {
        promise: null,
        resolve: null,
        reject: null
    };
    dfd.promise = new MyPromise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = MyPromise
// promise 测试工具 npm i promises-aplus-tests -g
// promises-aplus-tests promise.js
