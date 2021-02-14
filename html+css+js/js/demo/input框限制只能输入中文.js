// 主要通过 onfocus，onkeyup，onblur，oninput 这四个事件
const fn1 = () => {
    const input = document.querySelector('input[type="text"]');
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
