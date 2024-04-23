
# 模板

文档: <https://help.shopify.com/zh-CN/manual/online-store/themes>
1.模板和主题 一样的

# 应用

# 主题

```bash
    # https://shopify.dev/themes/getting-started/customize
    # https://shopify.dev/themes/tools/cli/theme-commands

    # 登录
    shopify login --store johns-apparel.myshopify.com

    # 拉取
    shopify theme pull

    # 本地开发
    shopify theme serve

    # 打包成zip
    shopify theme package

    # 分享，如果发布了，会直接覆盖
    # 所以拉取未发布的模板进行修改
    shopify theme push

    # 发布
    shopify theme publish

    # 数据填充
    # https://shopify.dev/themes/tools/cli/core-commands#populate

    # 登录中的店铺
    shopify store

    # 登出
    shopify logout
```

- [目录结构](https://shopify.dev/themes/architecture)

###### 设置全局属性 (config

- [settings_schema.json 文档](https://shopify.dev/themes/architecture/config/settings-schema-json)
- [settings_data.json 文档](https://shopify.dev/themes/architecture/config/settings-data-json)
- settings_schema.json 配置项
    - [文本配置](https://shopify.dev/themes/architecture/settings/sidebar-settings)
    - [控件配置](https://shopify.dev/themes/architecture/settings/input-settings)

    ```json
        {
            // 配置左上角的下拉菜单说明
            {
                "name": "theme_info",
                "theme_name": "Dawn",
                "theme_version": "5.0.0",
                "theme_author": "Shopify",
                "theme_documentation_url": "https:\/\/help.shopify.com\/manual\/online-store\/themes",
                "theme_support_url": "https:\/\/support.shopify.com\/"
            },
            // 左下角的 模板设置 (对应 shopify 自定义配置页面)
            {
                // 设置类别的名称
                "name": "选项名称",
                "settings": [
                    // 这里面放的都是配置项
                    // type 代表类型 (控件，文本。。。)
                    // content 代表文本
                    // id 全局访问的 key
                    // default 默认值
                    // label 控件标题
                    // info 控件描述
                ],
            }
        }
    ```

- settings_data.json 根据上面的配置项，所以对应的值
    - 应该是全局样式参数之类的配置

    ```json
        {
            // 包含当前保存在主题编辑器中的所有设置值。
            "current": {},
            // 预设内容
            "presets": {}
        }
    ```

###### 多语言 (locales

- [文档](https://shopify.dev/themes/architecture/locales)
    - 加入后缀`_html`可以识别 html 内容
        - `{ "layout2_html": "aasd <span>333</span>" }`
    - zh-CN.json 对应页面的语言设置
        - json: `{ "layout": { "header": { "hello_user": "Hello {{ first_name }} {{ last_name }}!" } } }`
        - 直接使用: `<span>{{ 'layout.header.hello_user' | t }}</span>`
        - 插入使用: `<span>{{ 'layout.header.hello_user' | t: first_name: customer.first_name, last_name: customer.last_name }}</span>`
    - zh-CN.schema.json 对应控制器的语言设置
        - `{"buttonName": "t:settings_schema.colors.name"}`

###### 模块 (sections

- [指定参数 获取模块](https://shopify.dev/api/section-rendering)

- [文档](https://shopify.dev/themes/architecture/sections)
- [控制器配置项 文档](https://shopify.dev/themes/architecture/sections/section-schema)
- 包含 模板和控制器

    ```liquid
        // 资源引入
        {{ 'component-image-with-text.css' | asset_url | stylesheet_tag }}
        // 会提取到公共样式
        {%- style -%} ... {%- endstyle -%}
        // 闭包处理
        {%- javascript -%} ... {%- endjavascript -%}

        // 模板
        <div> ... </div>

        // 引入模块
        {% section 'header' %}

        // 控制器
        {% schema %}
            // 配置项-主体
            {
                "name": "xxx",
                "tag": "section",
                "class": "xxx",
                // 限制模板添加次数
                "limit": 1,
                // 最大块数
                "max_blocks": 10,
                "settings": [
                    {
                        "type": "text",
                        "id": "header",
                        "label": "Header"
                    }
                ],
                // 配置项-子体
                // 配置内容同主体一样
                "blocks": [
                    {
                        "name": "Slide",
                        "type": "slide",
                        "settings": [
                            {
                                "type": "image_picker",
                                "id": "image",
                                "label": "Image"
                            }
                        ]
                    }
                ],
                // 预设内容
                "presets": [
                    {
                        "name": "...",
                        "settings": {},
                        "blocks": [
                            {
                                "type": "..."
                            },
                        ],
                    }
                ],
                // 用来指定页面类型使用
                "templates": [],
            }
        {% endschema %}
    ```

###### 模板 (template

- 文件名必须是有效的主题模板类型，并带有可选后缀作为备用模板。例如，产品模板可以命名为product.json或product.alternate.json。
- 模板只能作为 JSON 或 Liquid 模板存在，不能同时存在。例如，如果product.liquid已经存在，则无法创建product.json.
- [模板类型][https://shopify.dev/themes/architecture/templates#template-types]
- [数据说明](https://shopify.dev/themes/architecture/templates/json-templates)

    ```json
        {
            // 引用 layout 中的布局，默认 theme.liquid
            "layout": "theme",
            // 各种模块，id为键
            "sections": {
                "xxx-1": {
                    // 要渲染的节文件的文件名，不带扩展名。
                    "type": "aaaaaa",
                    // 配置的数据
                    "settings": {},
                    // 子模块，内容同 sections
                    "blocks": {},
                    // 子模块排序， 逻辑同 order
                    "block_order": [],
                },
            },
            // 按键指定顺序
            "order": [],
            // 作为模板的包装
            "wrapper": "div#div_id.div_class[attribute-one=value]",
        }
    ```

###### liquid

- ***[全局属性](https://shopify.dev/api/liquid/objects#global-objects)***
- [模块属性](https://shopify.dev/api/liquid/objects/section#section-settings)
- [子模块属性](https://shopify.dev/api/liquid/objects/block#block-settings)
    - 模块属性 数据结构

    ```json
        {
            // 自动生成的模块id
            "id": "...",
            // 子模块
            "blocks": [
                {
                    // 自动生成的子模块id
                    "id": "...",
                    // 控制器中的部分属性
                    "settings": { ... },
                }
            ],
            // 控制器中的部分属性
            "settings": { ... },
        }
    ```

- **[过滤器](https://shopify.dev/api/liquid/filters)**
    - [附加过滤器](https://shopify.dev/api/liquid/filters/additional-filters#date)
    - 字符串过滤器

        ```liquid
            // 拼接
            // sales.jpg
            {{ 'sales' | append: '.jpg' }}
            // Made a great sale
            {{ 'sale' | prepend: 'Made a great ' }}

            // 切割, 同 js slice
            {{ 'hello' | slice: 1, 3 }}

            // 分割为数组
            {% assign words = 'Hi, how are you today?' | split: ' ' %}

            //  删除前后空格/换行
            {{ '   too many spaces      ' | strip }}
            {{ '   too many spaces      ' | lstrip }}
            {{ '   too many spaces      ' | rstrip  }}

            // 全部删除 Hello, . Goodbye, .
            {{ 'Hello, world. Goodbye, world.' | remove: 'world' }}

            // 删除第一个
            {{ 'Hello, world. Goodbye, world.' | remove_first: 'world' }}

            // 替换所有
            {{ 'Hello, world. Goodbye, world.' | replace: 'world', 'Mega' }}

            // 替换第一个
            {{ 'Hello, world. Goodbye, world.' | replace_first: 'world', 'Mega' }}

            // 删除html标签 Hello World
            {{ '<h1>Hello</h1> World' | strip_html }}

            // 删除换行符
            {{ product.description | strip_newlines }}

            // 截断 The cat ca...
            {{ 'The cat came back the very next day' | truncate: 13 }}
            {{ 'The cat came back the very next day' | truncate: 13, '' }}
            {{ 'The cat came back the very next day' | truncate: 13, '999' }}

            // Base64 编码/解码
            {{ 'one two three' | base64_encode }}
            {{ 'b25lIHR3byB0aHJlZQ==' | base64_decode }}

            // 驼峰 ComingSoon
            {{ 'coming-soon' | camelcase }}

            // 第一个字符大写 Capitalize me
            {{ 'capitalize me' | capitalize }}

            // 小写 uppercase
            {{ 'UPPERCASE' | downcase }}

            // 大写 UPPERCASE
            {{ 'uppercase' | upcase }}

            // 转义
            {{ "<p>test</p>" | escape }}

            // 加密
            {{ "<p>test</p>" | remove: ' ' | strip_newlines | downcase | md5 }}
            {% assign my_secret_string = 'ShopifyIsAwesome!' | sha1 %}
            {% assign my_secret_string = 'ShopifyIsAwesome!' | sha256 %}
            {% assign my_secret_string = 'ShopifyIsAwesome!' | hmac_sha1: 'secret_key' %}
            {% assign my_secret_string = 'ShopifyIsAwesome!' | hmac_sha256: 'secret_key' %}

            // 各种url参数处理
            {{ 'john@liquid.com' | url_encode }}
            {{ 'Tetsuro Takara' | url_encode }}
            {{ '<hello> & <shopify>' | url_escape }}
            {{ '<hello> & <shopify>' | url_param_escape }}
        ```

    - 路径过滤器
        - 资源相关: asset_url, asset_img_url, file_url, file_img_url, image_url
        - 登录相关: customer_login_link, customer_logout_link, customer_register_link
        - 全局资源: global_asset_url, shopify_asset_url
            - shopify_asset_url
                - option_selection.js
                - api.jquery.js
                - shopify_common.js
                - customer_area.js
                - currencies.js
                - customer.css
        - 供应商: link_to_vendor, link_to_type

        ```liquid
            {{ 'shop.css' | asset_url }}

            {{ product | image_url: width: 400, height: 400, crop: 'bottom' }}

            {{ 'Shopify' | link_to: 'https://www.shopify.com', title: "A link to Shopify", class: "link-class" }}
        ```

    - html过滤器

        ```liquid
            // image_url 必须 带有 width 或 height
            // image_tag 可以设置其他参数，对前面的进行覆盖
            {{
                settings.favicon
                    | image_url: width: 2000
                    | image_tag:
                        width: 200
                        sizes: '(min-width: 1100px) 535px, (min-width: 750px) calc((100vw - 130px) / 2), calc((100vw - 50px) / 2)'
                        loading: 'lazy'
                        alt: 'qwe'
            }}

            // javascript 标签
            {{ 'shop.js' | asset_url | script_tag }}

            // style 标签
            {{ 'shop.css' | asset_url | stylesheet_tag }}

            // 时间处理
            // https://shopify.dev/api/liquid/filters/html-filters#time_tag

            // 交易相关
            // https://shopify.dev/api/liquid/filters/html-filters#payment_button
        ```

- [语法](https://shopify.dev/api/liquid/tags)
    - [内置标签功能](https://shopify.dev/api/liquid/tags/theme-tags)
    - `{{- }}` `{%- -%}` 多了`-`可以去除前/后空格，也可以只去一边
    - `{% render 'snippet-name' %}` 引入片段, [传递参数](https://shopify.dev/api/liquid/tags/theme-tags#passing-variables-to-a-snippet)
    - 关键词
        - `Nil` 是一个特殊的空值，当 Liquid 代码没有结果时返回。它不是带有字符“nil”的字符串。
        - `blank` 值类型的判断 (不确定
        - `empty` 引用类型的判断 (不确定
        - 循环
            - `break` 跳出循环
            - `continue` 跳过本次循环
            - `limit` 限制循环执行次数
            - `offset` 指定循环起点
            - `reversed` 倒叙遍历
    - [声明变量](https://shopify.dev/api/liquid/tags/variable-tags)

        ```liquid
            {% assign my_string = "Hello World!" %}
            {% assign my_int = 25 %}
            {% assign foo = true %}

            // 感觉像是拼接字符串用
            {% capture about_me %}
                I am {{ my_int }} and my favorite food is {{ my_string }}.
            {% endcapture %}

            // 递增 0++
            // 每次increment调用该变量时将其值增加 1。计数器的初始值为 0。
            // 创建的变量 与使用 increment创建的变量 是分开的
            {% increment my_int %}

            // 递减
            // 计数器的初始值为-1
            {% decrement variable %}
        ```

    - 判断
        - **在具有多个 and or or or 运算符的标签中，运算符按从右到左的顺序检查。您不能使用圆括号 更改操作顺序— 圆括号在 Liquid 中是无效字符，并且会阻止您的标签工作。**
        - **空字符串判断，会被识别为true**
        - && 用 and
        - || 用 or
        - contains 包含某个字符串

        ```liquid
            // if
            {% if product.title == 'Awesome Shoes' or product.title == 'Awesome' and product.title == 'qqq' %}
                You are buying some awesome shoes!
            {% endif %}

            // contains
            {% if product.title contains 'Shoes' %}
                You are buying some awesome shoes!
            {% endif %}

            // 取反
            {% unless product.title == 'Awesome Shoes' %}
                You are not buying awesome shoes.
            {% endunless %}

            // 空字符串判断
            {% unless settings.fp_heading == blank %}
                <h1>{{ settings.fp_heading }}</h1>
            {% endunless %}

            // if/elseif/else
            {% if shipping_method.title == 'International Shipping' %}
                You're shipping internationally. Your order should arrive in 2–3 weeks.
            {% elsif shipping_method.title == 'Domestic Shipping' %}
                Your order should arrive in 3–4 days.
            {% else %}
                Thank you for your order!
            {% endif %}

            // 同js switch
            {% case shipping_method.title %}
                {% when 'International Shipping' %}
                    You're shipping internationally. Your order should arrive in 2–3 weeks.
                {% when 'Domestic Shipping' %}
                    Your order should arrive in 3–4 days.
                {% when 'Local Pick-Up' %}
                    Your order will be ready for pick-up tomorrow.
                {% else %}
                    Thank you for your order!
            {% endcase %}
        ```

    - 循环

        ```liquid
            {% for product in collection.products %}
                {{ product.title }}<br>
                {% break %}
            {% endfor %}

            // 当数组长度为0, 走else
            {% for product in collection.products %}
                {{ product.title }}
            {% else %}
                The collection is empty.
            {% endfor %}

            // 只执行两次
            {% for item in numbers limit: 2 %}
                {{ item }}
            {% endfor %}

            // 从第二位值，开始循环
            {% for item in numbers offset: 2 %}
                {{ item }}
            {% endfor %}

            // 数字循环
            {% for i in (3..5) %}
                {{ i }}
            {% endfor %}

            {% assign my_limit = 4 %}
            {% for i in (1..my_limit) %}
                {{ i }}
            {% endfor %}

            // 倒叙遍历
            {% for item in array reversed %}
                {{ item }}
            {% endfor %}

            // https://shopify.dev/api/liquid/tags/iteration-tags#cycle
            {% for i in (1..4) %}
                {% cycle 'group1': 'one', 'two', 'three' %}
            {% endfor %}

            // 表格循环渲染 https://shopify.dev/api/liquid/tags/iteration-tags#tablerow
        ```
