

// Promise/A+规范的三种状态 Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态）
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise3 {
    constructor (executor) {
        this._status = PENDING;
        this._relTeam = [];
        this._relVal = null;
        this._rejTeam = [];
        this._rejVal = null;

        const rel = (val) => {
            if (this._status !== PENDING) return;
            this._status = FULFILLED;
            this._relVal = val;
            while (this._relTeam.length) {
                const fn = this._relTeam.shift();
                fn(val);
            }
        };

        const rej = (val) => {
            if (this._status !== PENDING) return;
            this._status = REJECTED;
            this._rejVal = val;
            while (this._rejTeam.length) {
                const fn = this._rejTeam.shift();
                fn(val);
            }
        };

        executor(rel, rej);
    }

    then (success, error) {
        // console.log(1);
        success = success ? success : ((val) => val);
        error = error ? error : ((val) => val);
        return new Promise3((rel, rej) => {
            const _status = this._status;

            const relFun = (val) => {
                try {
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

            switch (_status) {
                case PENDING:
                    this._relTeam.push(relFun);
                    this._rejTeam.push(rejFun);
                    break;
                case FULFILLED:
                    relFun(this._relVal);
                    break;
                case REJECTED:
                    rejFun(this._rejVal);
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
            (val) => {cb();return Promise3.resolve(val)},
            (val) => {cb();return Promise3.reject(val)},
        );
    }
}

Promise3.resolve = function (val) {
    return val instanceof Promise3 ? val : new Promise3((rel) => rel(val));
}
Promise3.reject = function (val) {
    return val instanceof Promise3 ? val : new Promise3((rel, rej) => rej(val));
}
Promise3.all = function (arr) {
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
Promise3.race = function (arr) {
    return new Promise3((rel, rej) => {
        arr.forEach((fn) => {
            fn.then((val) => rel(val), (val) => rej(val));
        })
    });
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













