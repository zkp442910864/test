

HTTP 超文本传输协议

    DNS
        主要用来进行 域名 和 IP 之间的转换服务, 使用的是 UDP协议（主要就是少了 TCP协议 的连接时延, 以快速的方式得到IP）。

    模型
        应用层      http请求, FTP...
        传输层      TCP 和 UDP 协议
        网络层      IP
        链路层
        物理层

    优缺点
        无状态
            通过 cookie, session, localStorage(存取数据) 来解决

        可靠的传输
            基于 TCP/IP 实现的

        请求-应答模式

        明文传输
            主要指的是请求头, 这样会把数据都暴露给外界

        队头阻塞
            http的 请求-应答模式是以队列的方式排列的, 先进先出, 当第一个请求响应延迟了会影响到后面的请求。
            缓解方式, 可以通过 并发 或者 多域名。

    版本差异
        0.9     1991年, 只有get请求方式且只能传输文本

        1.0     加入了 post 和 head 命令
                增加传输图像, 视频, 二进制文件
                header 中 If-Modified-Since 和 Expires 作为缓存失效的标准。

        1.1     1999年发布至今
                持久链接, 同一个 TCP链接 可以被复用
                可以进行并发（管道机制）
                支持断点续传
                新增请求方式: put, delete, options, patch

        2.0     二进制分帧 头信息和数据体都是二进制, 统称为帧, 头信息帧和数据帧
                头部压缩 头信息压缩, 使用的是 HPACK 算法进行压缩 （好像就是用健值映射方式）
                多路复用 解决队头阻塞问题
                服务器推送
                请求优先级

    常见状态码
        1xx     代表请求已被接受, 但需要处理

        2xx     表示成功的状态
            200     正常 请求-应答
            204     请求-无资源响应

        3xx     资源被重定向了
            302     临时重定向, 资源被分配到另一个地址（目前接触到, 直接访问, 未登录时重定向）
            304     协商缓存, 命中缓存时返回这个状态

        4xx     客户端错误
            403     权限不足, 被服务器拒绝
            404     请求资源不存在（路径错误）
            405     禁止使用该请求方式

        5xx     服务端错误
            500     服务器执行报错了
            502     出现了未知问题
            503     服务器维护中

    请求头参数
        Connection: keep-alive
            http/1.0 默认关闭  http/1.1 默认开启
            Connection: keep-alive      开启
            Connection: close           关闭

            Keep-Alive 模式（又称持久连接, 连接重用）
            主要可以在多个 http 请求中, 使用同一个 TPC连接, 以减少创建/关闭多个TCP连接的开销。

        缓存
            1.强缓存
                两种情况: 发送http请求, 不发送
                相关的头信息字段:
                    Expires (对应http/1.0)
                        一个时间，表示过期时间。
                        注意点：服务器和客户端时间会出现不一致的情况

                    Cache-Control (对应http/1.1, 优先级高)
                        Cache-Control:max-age=6000      资源返回后的 6000秒 里使用缓存

                注意: 未过期时走缓存，有就停止，没有继续往下走

            2.协商缓存
                强缓存失效后，走协商缓存，主要是根据 缓存tag 进行判断。

                相关的头信息字段:
                    Last-Modified       在响应头中返回, 这是一个最后修改的时间值
                    if-Modified-Since   携带到请求头中
                        if-Modified-Since >= Last-Modified      读取缓存，被重定向 304状态码

                    ETag                在响应头中返回, 这是根据内容生成的 md5值
                    if-None-Match       携带到请求头中
                        两值进行对比，一致就读取缓存，被重定向 304状态码

                性能上: Last-Modified 优于 ETag, 生成 md5值耗性能
                精度上: ETag 优于 Last-Modified, md5值对比更准确, 时间的最小单位是秒，1秒内的情况对比不出来。

                同时存在时 ETag 优先级高
                条件不成立的情况下，进行请求。

            缓存位置
                Service Worker
                    主要对 PWA 进行的离线缓存

                Memory Cache
                    存储在内存中，速度快，容量小，时间短

                Disk Cache
                    相对于内存缓存慢点，单容量大，时间长

                Push Cache
                    http/2 的内容

                Memory Cache 和 Disk Cache 存放条件：
                    内容使用率高的话，存磁盘
                    较大的js、css存磁盘，反之存内存

            流程上大概就是
                请求 -> 强缓存 -> 协商缓存 -> 响应
                当 强缓存 或者 协商缓存 命中时，重定向到304，从缓存中取数据

    请求方法
        GET             请求获取Request-URI所标识的资源
        POST            在Request-URI所标识的资源后附加新的数据
        HEAD            请求获取由Request-URI所标识的资源的响应消息报头
        PUT             请求服务器存储一个资源，并用Request-URI作为其标识（修改数据）
        DELETE          请求服务器删除对应所标识的资源
        TRACE           请求服务器回送收到的请求信息，主要用于测试或诊断
        CONNECT         建立连接隧道，用于代理服务器
        OPTIONS         列出可对资源实行的请求方法，用来跨域请求

        GET 和 POST 区别
            参数角度: get在url路径上。post在请求体上，比较安全。
            缓存角度: get浏览器会主动缓存，post 不会。
            编码角度: get请求只能进行url编码，只接受ASCII码。post支持更多编码
            传输角度: get一次性发送。post分两个TCP数据包，先发header 服务器响应100，再发body

        OPTIONS
            目前遇到的情况：跨域请求(而且是复杂请求，应该就是传json数据)时触发的 嗅探请求(自己理解为预请求), 用来判断是否有访问权限

    URL 的理解
        首先它是一个资源地址，由 协议, 域名, 路径或hash, 参数 组成。
        在发送的时候，会转换成ASCII格式, 然后把非ASCII码的转成可识别的编码，格式: 百分号 + 两位十六进制数










参考文献
    https://mp.weixin.qq.com/s?__biz=MzUxMjkwMjU1MQ==&mid=2247487596&idx=2&sn=4d8180a78c411c47f92b6608136e88b9&chksm=f95c0494ce2b8d82cd8a8a6fffe5dddf9a9297043f6a62e856fdae5168c4bd4fc39d5700cdba&scene=21#wechat_redirect
