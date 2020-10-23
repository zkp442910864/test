

### 技巧

部分输入框按 ctrl + space 有智能提示


p表示搜索后面关键词

可以编辑DOM中的任何内容         document.body.contentEditable = true

控制台快捷键
    ctrl+p                      查找当前网站已加载的资源文件
    ctrl+shift+p                显示所有命令
    ctrl+shift+d                切换控制面板展示
    ctrl+l                      清空console面板数据
    ctrl+R / f5                 正常重新加载
    ctrl+shift+R/shift f5       硬性重新加载


```
    Element 面板
        h 按键              显示/隐藏节点
        ctrl + up/down      移动节点
        ctrl + z            撤销操作

        右键菜单
            expand recursively      展开节点下所有节点

        样式调试，递增/递减 (针对数值类的)
            up/down             加减1
            ctrl + up/down      加减100
            shift + up/down     加减10
            alt + up/down       加减0.1
```

```
    Newwork 面板
        过滤        method:GET      筛选get请求
                    -method:GET     筛选非get请求

        请求列表字段选择,可发现意想不到的东西(p: 图4)
            在列表头右键或空白处,右键弹出菜单

        重新发送请求        在请求接口右键, 选择 Replay XHR 重新发送请求
        禁止某个请求        在请求接口右键, 选择 Block request URL / Block request domain

        对接口进行断点(p: 接口断点)
```

```
    Sources 面板
        保存代码块      导航栏里选中Snippets这栏 >> 新增 (右键运行 或 选中+ctrl+enter 或 p: 快速执行代码块)

        条件断点        想断点的地方 Add conditional breakpoint (p: 图1)
        扩展用法        使用条件断点时，如果写入的条件false 时(意思是可以动态增加日志打印)，不会打断打代码执行 (p: 图2)
        接口断点        1.找到 XHR/fetch breakpoint. 2.添加接口路径. 3.刷新页面
```

```
    Console 面板
        保存堆栈信息     右键保存
        console 默认就被 async 包裹

        自定义打印数据          https://juejin.im/book/6844733783166418958/section/6844733783212589063
        实时表达式 (p: 图3)     https://juejin.im/book/6844733783166418958/section/6844733783216766983

        console.assert(null, '无值')               当第一个参数为false 时会打印第二个参数，否则啥都不会打印
        console.table(a, b)                        a: 对象或数组时会以 表格方式 打印出来, b(可选): 需要的字段
        console.dir(a)                             把值以对象的方式打印出来，主要可针对节点和函数等
        console.trace()                            打印执行栈
        console.time('a')                          开启一个计时器
            console.timeEnd('a')                   结束计时并且将结果在 console 中打印出来
        console.group('start')                     打印一组数据
            console.log('sub1');
            console.log('sub1');
            console.log('sub1');
            console.groupEnd();
        console.count('调用次数');                  调用次数累加
        console.log('%casdf', 'font-size:50px')    增加样式
                基于调用堆栈自动缩进    https://juejin.im/book/6844733783166418958/section/6844733783216766983

        都属于内置函数
        $_              对上次执行的结果的 引用
        $0-$4           Element面板中选中的节点, $0当前选中 $1上一个选中 $2...(以此类推)
        $()             类似jquery 的用法
        $i()            加载npm 模块,需安装google插件
            https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related

        queryObjects(a)     参数a: 一个类,返回实例化且使用中的对象
        copy(a)             参数a: 大部分值,可以直接拷贝对象

        monitor、monitorEvents 不理解使用场景 https://juejin.im/book/6844733783166418958/section/6844733783216750600
```

```
    打开命令面板 (Ctrl + P 无前缀) (Ctrl + Shift + P 有>前缀)
        全屏截图    >Capture full size screenshot
        节点截图    >Capture node screenshot (需要 先在Element面板 选中节点)

        切换调试面板布局        >layout
        切换调试面板主题        >theme

        快速执行代码块          !

        打开日志打印时间        >time
```

```
    切换 DevTools(调试窗口) 窗口的展示布局
        ctrl + shift + D
        面板切换
            ctrl + [
            ctrl + ]
            ctrl + (1-9) 需要设置 DevTools >> Settings >> Preferences >> *Appearance* >> Enable Ctrl + 1-9 shortcut to switch panels
```

###### 图1
![Image text](167b94b8f36112b7.gif)

###### 图2
![Image text](167b955a1f0311fc.gif)

###### 图3
![Image text](167f82b33009449f.gif)

###### 图4
![Image text](167f828279b0b397.gif)
