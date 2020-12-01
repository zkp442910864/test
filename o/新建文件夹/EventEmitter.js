
// 发布订阅EventEmitter
export default class EventEmitter {
    constructor () {
        this.$event = {};
    }

    /**
     * 添加事件，注意要在销毁组件或页面的时候，使用zOff 移除对应的函数
     * @param {*} eventStr 事件名
     * @param {*} fn 执行函数
     */
    zOn (eventStr, fn) {
        this.$event[eventStr] = this.$event[eventStr] || [];
        fn.oneRemove = false;
        this.$event[eventStr].push(fn);
    }

    /**
     * 添加事件，使用一次就移除
     * @param {*} eventStr 事件名
     * @param {*} fn 执行函数
     */
    zOnce (eventStr, fn) {
        this.$event[eventStr] = this.$event[eventStr] || [];
        fn.oneRemove = true;
        this.$event[eventStr].push(fn);
    }

    /**
     * 触发事件
     * @param {*} eventStr 事件名
     * @param {*} arg 参数
     */
    zEmit (eventStr, ...arg) {
        const arr = this.$event[eventStr];
        if (arr && arr.length) {
            const fnArr = [];
            arr.forEach((fn) => {
                const oneRemove = fn.oneRemove;
                fn(...arg);
                oneRemove && fnArr.push(fn);
            });
            fnArr.forEach((fn) => {
                this.zOff(eventStr, fn);
            });
        }
    }

    /**
     * 移除事件
     * @param {*} eventStr 事件名
     * @param {*} fn 执行函数
     */
    zOff (eventStr, fn) {
        // debugger
        const arr = this.$event[eventStr];
        if (arr && arr.length) {
            const index = arr.findIndex((curFn) => curFn === fn);
            ~index && arr.splice(index, 1);
        }
    }
};
