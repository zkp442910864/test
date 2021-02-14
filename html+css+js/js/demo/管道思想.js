
// 管道思想，即一个函数的输出值是下一个函数的输入值：
// pipeline 注意reduce参数的用法，将val作为reduce的第二个参数，也就是回调函数prev的默认值
const pipeLine = (...methods) => {
    return (val = 0) => {
        return methods.reduce((prev, cur) => cur(prev), val);
    }
}

function fun1 (a) {
    return a + 5
}
function fun2 (b) {
    return b + 10
}
function fun3 (b) {
    return b + 10
}
console.log(pipeLine(fun1, fun2, fun3)(10));// 35


// 一些复杂的逻辑计算，可以利用这种思想，以前开发电商支付页面，每个结果都需要有前置条件计算得出
const pipeLineObj = (...methods) => {
    return (val) => {
        return methods.reduce((prev, cur) => cur(prev), val);
    }
}

// 初始化
const initPrice = (data) => {
    // ...
    return {...data};
}

// 计算优惠券
const countCoupon = (data) => {
    // ...
    return {...data};
}

// 计算积分
const countIntegral = (data) => {
    // ...
    return {...data};
}

// 计算会员折扣
const countVipDiscount = (data) => {
    // ...
    return {...data};
}

// 最终得到结果
const total = (data) => {
    // ...
    return {...data};
}

const countFun = pipeLineObj(initPrice, countCoupon, countIntegral, countVipDiscount, total)
countFun({}); // 输出结果对象
