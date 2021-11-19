https://juejin.cn/post/7028958154545168414?utm_source=gold_browser_extension

svg
    注意：
        所有的开启标签必须有关闭标签！
        样式可以写到style 标签中

    包裹标签 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="100"></svg>
        xmlns 属性可定义 SVG 命名空间。
        version 属性可定义所使用的 SVG 版本。
        width 和 height 属性可设置此 SVG 文档的宽度和高度。

    圆 <circle cx="100" cy="100" r="98" stroke="black" stroke-width="2" fill="red" />
        容器里的圆心的坐标轴     cx, cy
        半径                    r
        轮廓(边框)              stroke-width
        轮廓(边框)颜色          stroke
        填充颜色                fill

    矩形 <rect x="0" y="0" style="fill:rgb(122,122,0);stroke-width:2;stroke:rgb(0,0,0);width:1000px;height:100px;" />
        容器里的坐标轴      x, y


HTML中使用SVG
    <img title="q" src="./test.svg"/>
    <embed src="./test.svg" type="image/svg+xml" />
    <object title="q" data="./test.svg" type="image/svg+xml"></object>
    <iframe src="./test.svg"></iframe>


