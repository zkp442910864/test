// 创建 new Date，苹果不兼容 '2020-02-02' 这种格式
const createDate = (str) => {
    const reg1 = /^(\d{4})[-|/](\d{1,2})[-|/](\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    const reg2 = /^(\d{4})[-|/](\d{1,2})[-|/](\d{1,2})$/;
    let arr = reg1.exec(str);
    !arr && (arr = reg2.exec(str));
    if (arr === null) {
        throw `参数时间：${str}，正则匹配不上`;
    }
    const newArr = arr.slice(1);
    newArr.forEach((val, index) => {
        newArr[index] = val.padStart(2, '0');
    });
    // console.log(newArr);
    const _Date = Date;
    return new _Date(...newArr);
};