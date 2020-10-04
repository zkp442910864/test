
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
    newArr.forEach((val: any, index) => {
        newArr[index] = val.padStart(2, '0');
    });
    // console.log(newArr);
    const _Date: any = Date;
    return new _Date(...newArr);
};


// input框限制只能输入中文
// 主要通过 onfocus，onkeyup，onblur，oninput 这四个事件
const fn1 = () => {
    const input: any = document.querySelector('input[type="text"]');
    const clearText = target => {
        const {
            value
        } = target;
        target.value = value.replace(/[^\u4e00-\u9fa5]/g, '');
    };
    input.onfocus = ({target}) => {
        clearText(target);
    };
    input.onkeyup = ({target}) => {
        clearText(target);
    };
    input.onblur = ({target}) => {
        clearText(target);
    };
    input.oninput = ({target}) => {
        clearText(target);
    };
};
