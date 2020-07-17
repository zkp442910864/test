
// 观察者模式
// 收集依赖 -> 触发通知 -> 取出依赖执行
// 在Promise里，执行顺序是then收集依赖 -> 异步触发resolve -> resolve执行依赖

// Promise/A+规范的三种状态 Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态）
// Pending -> Fulfilled
// Pending -> Rejected
// 状态变更不可逆

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise3 {
    constructor (executor) {
        // _relTeam、_rejTeam 两个执行函数队列
        // _value 第一次执行时，传入的值，保存下来，以便下次调用
        this._status = PENDING;
        this._relTeam = [];
        this._rejTeam = [];
        this._value = null;

        // 两个对调函数的处理，在执行的同时改变当前 Promise 状态，同时存储值
        const rel = (val) => {
            //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
            setTimeout(() => {
                if (this._status !== PENDING) return;
                // 状态变更
                this._status = FULFILLED;
                this._value = val;
                while (this._relTeam.length) {
                    const fn = this._relTeam.shift();
                    fn(val);
                }
            });

        };

        const rej = (val) => {
            setTimeout(() => {
                if (this._status !== PENDING) return;
                this._status = REJECTED;
                this._value = val;
                while (this._rejTeam.length) {
                    const fn = this._rejTeam.shift();
                    fn(val);
                }
            });
        };

        executor(rel, rej);
    }

    then (success, error) {
        // 值穿透 处理方式
        success = success ? success : ((val) => val);
        error = error ? error : ((val) => val);

        // then的链式调用
        return new Promise3((rel, rej) => {
            // 这里的 this 指向的上个Promise，注意箭头函数

            const relFun = (val) => {
                try {
                    // 执行第一个(当前的)Promise的成功回调,并获取返回值
                    const sVal = success(val);
                    sVal instanceof Promise3 ? sVal.then(rel, rej) : rel(sVal);
                } catch (error) {
                    rej(error);
                }
            }

            const rejFun = (val) => {
                try {
                    const eVal = error(val);
                    eVal instanceof Promise3 ? eVal.then(rel, rej) : rej(eVal);
                } catch (error) {
                    rej(error);
                }
            }

            switch (this._status) {
                case PENDING:
                    this._relTeam.push(relFun);
                    this._rejTeam.push(rejFun);
                    break;
                case FULFILLED:
                    relFun(this._value);
                    break;
                case REJECTED:
                    rejFun(this._value);
                    break;
                default:
                    break;
            }
        });
    }

    catch (error) {
        return this.then(null, error);
    }

    finally (cb) {
        return this.then(
            (val) => {cb(val);return Promise3.resolve(val)},
            (val) => {cb(val);return Promise3.reject(val)},
        );
    }

    static resolve (val) {
        return val instanceof Promise3 ? val : new Promise3((rel) => rel(val));
    }

    static reject (val) {
        return val instanceof Promise3 ? val : new Promise3((rel, rej) => rej(val));
    }

    // 一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
    static race (arr) {
        return new Promise3((rel, rej) => {
            arr.forEach((fn) => {
                fn.then((val) => rel(val), (val) => rej(val));
            })
        });
    }

    static all (arr) {
        return new Promise3((rel, rej) => {
            const valArr = [];
            let index = -1;
            arr.forEach((fn) => {
                fn.then((res) => {
                    index++;
                    valArr[index] = res;
                    if (index === arr.length -1) {
                        rel(valArr);
                    }
                }).catch((err) => {
                    rej(err);
                });
            });
        });
    }

    // 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
    static allSettled (arr) {
        return new Promise3((rel, rej) => {
            const valArr = [];
            let index = -1;
            arr.forEach((fn) => {
                fn.then((res) => {
                    valArr.push({status: 'fulfilled', value: res});
                    index++;
                    if (index === arr.length -1) {
                        rel(valArr);
                    }
                }).catch((res) => {
                    valArr.push({status: 'rejected', reason: res});
                    index++;
                    if (index === arr.length -1) {
                        rel(valArr);
                    }
                });
            });
        });
    }
}

class Promise2 {
    constructor (cb) {
        this.relParams = null;
        this.rejParams = null;
        this.thenCb = null;
        this.catchCb = null;
        cb((params) => {
            this.rel(params);
        }, (params) => {
            this.rej(params);
        });
    }

    rel (params) {
        // console.log(this);
        this.relParams = params;
        this.thenCb && this.thenCb(params);
    }

    rej (params) {
        this.rejParams = params;
        this.catchCb && this.catchCb(params);
    }

    then (cb) {
        this.thenCb = cb;
        this.relParams && this.thenCb(this.relParams);
    }

    catch (cb) {
        this.catchCb = cb;
        this.rejParams && this.catchCb(this.rejParams);
    }
}













