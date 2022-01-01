https://juejin.cn/post/7028958154545168414?utm_source=gold_browser_extension
https://juejin.cn/post/7029332470512386055

svg
    注意：
        所有的开启标签必须有关闭标签！
        样式可以写到style 标签中

    包裹标签,一个容器 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="100"></svg>
        注意：
            容器有个默认宽高 300*150，通过 width，height 进行设置
            当内容超过容器，会被隐藏了（内容宽 + 边框宽）
            画一个图形的时候，可以画个草图，标上坐标画出来，在用代码实现
        xmlns 属性可定义 SVG 命名空间。
        version 属性可定义所使用的 SVG 版本。
        width 和 height 属性可设置此 SVG 文档的宽度和高度。

    通用属性
        轮廓(边框)              stroke-width
            边框会和内容进行重叠，以边对半分
        轮廓(边框)颜色          stroke
        轮廓(边框)透明          stroke-opacity
        填充颜色                fill
        填充颜色透明            fill-opacity
        整体透明                opacity

    圆 <circle cx="100" cy="100" r="98" stroke="black" stroke-width="2" fill="red" />
        容器里的圆心的坐标轴     cx, cy
        半径                    r

    椭圆 <ellipse cx="100" cy="50" rx="100" ry="50" style="fill:red;stroke:purple;stroke-width:2" />
        容器里的圆心的坐标轴     cx, cy
        水平半径                rx
        垂直半径                ry

    矩形 <rect x="0" y="0" style="fill:rgb(122,122,0);stroke-width:2;stroke:rgb(0,0,0);width:1000px;height:100px;" />
        容器里的左上角坐标轴      x, y
        圆角生效                 rx, ry
            rx 和 ry 任一属性可使矩形产生圆角

    线条 <line x1="10" y1="10" x2="100" y2="100" style="stroke:black;stroke-width:5" />
        起始点      x1, y1
        结束点      x2, y2

    折线 <polyline points="0 25, 100 25, 10 100, 50 0, 90 100, 0 25" style="fill:none;stroke:black;stroke-width:3" />
        坐标点集合      points
            x y 为一组坐标，一个值的时候好像是被忽略掉了

    多边形 <polygon points="25 25, 50 50, 25 50" style="fill:red;stroke:purple;stroke-width:1"/>
        坐标点集合      points
            x y 为一组坐标，一个值的时候好像是被忽略掉了

    路径 <path d="M150 0 L75 200 L205 270 Z" />
        路径数据：
            M = moveto      移动到某个坐标
            L = lineto      画线
            H = horizontal lineto   水平画线
            V = vertical lineto     垂直画线
            C = curveto
            S = smooth curveto
            Q = quadratic Bézier curve
            T = smooth quadratic Bézier curveto
            A = elliptical Arc
            Z = closepath       结束画线



HTML中使用SVG
    <img title="q" src="./test.svg"/>
    <embed src="./test.svg" type="image/svg+xml" />
    <object title="q" data="./test.svg" type="image/svg+xml"></object>
    <iframe src="./test.svg"></iframe>


