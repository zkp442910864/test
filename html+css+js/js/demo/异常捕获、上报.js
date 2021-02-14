// 异常捕获、上报
// 捕获
    // return true; 可以阻止控制台打印错误信息，貌似无效
    // 捕获到同步、异步中的错误，但资源加载出错捕获不到
    window.onerror = (...a) => {console.log(a);return true;};

    // 捕获到同步、异步中的错误，以及资源加载出错(第三个参数的原因)
    window.addEventListener('error', (...a) => {console.log(a);return true;}, true);

    // 捕获Promise 中的错误
    window.addEventListener('unhandledrejection', (...a) => {console.log(a);return true;});

    // 例子：
        // 将unhandledrejection事件抛出的异常再次抛出就可以统一通过error事件进行处理了。
        window.addEventListener('unhandledrejection', (e) => {throw e.reason});
        window.addEventListener('error', (...a) => {
            console.log(a);
            return true;
        }, true);

上报
    // https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa
    // 以下的数据都可以从 错误对象 上获取到(e | e.error)
    // js 中的错误
    const errObj = {
        // 错误信息
        message,
        // 异常资源url
        filename,
        // 异常行号
        lineNo,
        // 异常列号
        colno,
        // 异常对象
        error,
        // 异常对象 -> 错误信息
        errorMessage,
        // 异常对象 -> 错误信息
        errorStack,
    }

    // 资源文件加载错误，从误对象上获取到(e.target)
    const errObj = {
        // 资源所处的页面
        baseURI,
        // 节点名称
        nodeName,
        // 资源路径（img 标签）
        currentSrc,
        // 资源路径（link 标签）
        href,
        // 节点的html
        outerHTML
    }

    // utf8_to_b64
    const str = window.btoa(unescape(encodeURIComponent(JSON.stringify(errObj))));
    // b64_to_utf8
    decodeURIComponent(escape(window.atob(str)));

    // 上报
    new Image().src = `...?i=${str}`;

