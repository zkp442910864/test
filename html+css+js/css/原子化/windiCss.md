# Windi Css 使用

- 功能([原子化 CSS](https://www.qiyuandi.com/zhanzhang/zonghe/11209.html)
    - 根据类名，自动推导出样式并生成
    - [内置了许多类名](https://cn.windicss.org/utilities/layout/flexbox.html)
    - [安装](https://cn.windicss.org/integrations/webpack.html)
    - [vscode插件安装](https://cn.windicss.org/editors/vscode.html)
    - [参考资料](https://juejin.cn/post/7040409435826552846#heading-9)

- 安装
    - `npm i windicss windicss-webpack-plugin -D`
    - webpack配置 -> plugins 中引入该插件
    - 项目入口处引入 `import 'windi.css'`
    - 根目录处创建 windi.config.ts 配置文件
        - [plugins 配置](https://cn.windicss.org/plugins/interfaces.html)

## 自定义规则样式

- 通过插件的方式引入

    ```js
        import {defineConfig, transform} from 'windicss/helpers';
        import colors from 'windicss/colors';
        import plugin from 'windicss/plugin';

        export default defineConfig({
            // 类名前缀
            // prefix: 'ws-',
            // 样式补全 -webkit,-moz,-ms 这些
            prefixer: true,
            // 样式重置
            preflight: false,
            // 自定义内容
            plugins: [
                plugin(({addDynamic}) => {
                    const gauge = (type) => {
                        return ({Utility, Style, Keyframes, Property}) => {
                            // Utility._raw
                            const data = Utility.class.match(/m-([a-z|A-Z]+|\d+)-?(\d+)?/);

                            if (!data) return undefined;

                            if (!isNaN(data[1])) {
                                return Style.generate(Utility.class, {
                                    [type]: `${data[1]}px`,
                                });
                            }

                            const map = {
                                l: 'left',
                                r: 'right',
                                t: 'top',
                                b: 'bottom',
                            };

                            if (data[1] === 'tb' || data[1] === 'y') {
                                return Style.generate(Utility.class, {
                                    [`${type}-bottom`]: `${data[2]}px`,
                                    [`${type}-top`]: `${data[2]}px`,
                                });
                            }

                            if (data[1] === 'lr' || data[1] === 'x') {
                                return Style.generate(Utility.class, {
                                    [`${type}-left`]: `${data[2]}px`,
                                    [`${type}-right`]: `${data[2]}px`,
                                });
                            }

                            if (!map[data[1]]) return undefined;

                            return Style.generate(Utility.class, {
                                [`${type}-${map[data[1]]}`]: `${data[2]}px`,
                            });
                        };
                    };

                    const container = (type, unit?: string) => {
                        return ({Utility, Style}) => {
                            const data = Utility.class.match(/[a-z|A-Z]+(-)?(\d+)/);

                            if (!data) return undefined;
                            // console.log(data);

                            unit = unit || (data[1] === '-' ? '%' : 'px');
                            const val = data[2];

                            return Style.generate(Utility.class, {
                                [type]: `${val}${unit}`,
                            });
                        };
                    };

                    // m-l-1 m-r-5 m-t-5 m-b-5 m-y-10 m-x-10 m-tb-10 m-lr-10 m-10
                    // p-l-1 p-r-5 p-t-5 p-b-5 p-y-10 p-x-10 p-tb-10 p-lr-10 p-10
                    addDynamic('m-', gauge('margin'));
                    addDynamic('p-', gauge('padding'));

                    // px值
                    // width100 width200
                    // height100 height200
                    // 百分比
                    // width-100 width-200
                    // height-100 height-200
                    addDynamic('width', container('width'));
                    addDynamic('height', container('height'));

                    // font-12 字体大小
                    addDynamic('font-', container('font', 'px'));

                    addDynamic('color-', ({Utility, Style, Keyframes, Property}) => {
                        const data = Utility.class.match(/color-([a-z|A-z]+)/);

                        if (!data) return undefined;

                        const map = {
                            main: '#1890ff',
                            red: '#f5222d',
                            error: '#f5222d',
                            gray: '#999',
                        };

                        if (!map[data[1]]) return undefined;

                        return Style.generate(Utility.class, {
                            color: map[data[1]],
                        });
                    });
                }),
            ],
        });
    ```
