
微前端方案
    多项目统一入口，可单独开发部署
    官方文档 https://qiankun.umijs.org/zh/api/
    文献
        https://github.com/hql7/wl-micro-frontends
        https://www.javascriptc.com/3977.html

    基于Vue-cli3 实现
        主应用
            注意点
                vue.config.js 配置项
                    publicPath
                        使用绝对路径
                        mode: 'history' 当路由使用这种模式，相对路径刷新会报错（貌似是因为请求路径出现错了）

                    devServer: {
                        // 本地开发加上这个，允许跨域请求，服务器上要记得配置
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }

                    externals 使用了这个的要注意，可能会引起一系列问题
                        1.window.Vue 貌似和子应用有冲突，目前是直接 delete window.Vue; 或者不要用 externals 引入文件
                        2.同时（主和子）引用了 'https://webapi.amap.com/maps?v=1.4.6&key=5bffe31c75ddac4470b6104b67a7e872'，会报错，把子应用的去掉就可以了
                        估计都是因为挂载到 window 上引起的

                路由使用 mode: 'history'， hash 貌似有问题

            main.ts 的内容
                import {registerMicroApps, start} from 'qiankun';
                let app: Vue | null = null;
                function render ({appContent, loading}: any = {}) {
                    // debugger
                    if (!app) {
                        app = new Vue({
                            router,
                            store,
                            data () {
                                return {
                                    content: appContent,
                                    loading
                                };
                            },
                            render (h: any) {
                                return h(App, {
                                    props: {
                                        content: this.content,
                                        loading: this.loading
                                    }
                                });
                            }
                        }).$mount('#app');
                    } else {
                        app.content = appContent;
                        app.loading = loading;
                    }
                }

                function reg () {
                    registerMicroApps([
                        {
                            // 子应用的名称，唯一
                            name: 'sub_demo',
                            // 子应用的路径
                            entry: 'http://192.168.3.21:8091',
                            // 用来显示子应用的数据，写在App.vue
                            container: '#yourContainer',
                            // 路由匹配到 ‘/manage’ 的路径就启用注册的子应用
                            activeRule: location => location.pathname.startsWith('/manage'),
                            // 渲染函数
                            render,
                            // 传递到子应用的数据
                            props: {},
                        },
                    ], {
                        beforeLoad: async (app) => console.log('beforeLoad', app),
                        beforeMount: async (app) => console.log('beforeMount', app),
                        afterMount: async (app) => console.log('afterMount', app),
                        beforeUnmount: async (app) => console.log('beforeUnmount', app),
                        afterUnmount: async (app) => console.log('afterUnmount', app),
                    });

                    start();
                }

            App.vue 的内容
                html：增加 <div v-html="content" id="yourContainer"></div>
                    主要用来渲染html

                js：增加
                    props: {
                        loading: Boolean,
                        content: String
                    }

        子应用
            注意点
                vue.config.js 配置项
                    publicPath
                        使用绝对路径
                        mode: 'history' 当路由使用这种模式，相对路径刷新会报错（貌似是因为请求路径出现错了）


                    devServer: {
                        // 本地开发加上这个，允许跨域请求，服务器上要记得配置
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    }

                    chainWebpack: (config) => {
                        // 以这种输出方式，主应用才能识别到子应用
                        config.output
                            .jsonpFunction(`webpackJsonp_${packageName}`)
                            .library(`${packageName}-[name]`)
                            .libraryTarget('umd');
                    }

                    externals 使用了这个的要注意，可能会引起一系列问题

            main.ts 的内容
                // 判断是否 qiankun 环境
                const isQianKun = window.__POWERED_BY_QIANKUN__;

                // 这个必须要的，异步请求和资源文件才能请求到正确的路径
                // 这个很重要，不然异步请求和资源文件会请求到主应用上
                if (isQianKun) {
                    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
                }

                let vueApp: any = null;

                // 以下这些函数可以看文档，有具体的解释
                export async function bootstrap () {
                    console.log('vue');
                }

                export async function mount (props: any) {
                    vueApp = new Vue({
                        router,
                        store,
                        render: h => h(App)
                    }).$mount('#app');
                }

                export async function unmount () {
                    if (vueApp) {
                        vueApp.$destroy();
                        vueApp = null;
                    }
                }

                export async function update (props: any) {
                    console.log('update props', props);
                }

                !isQianKun && mount({});

            router 路由文件
                const isQianKun = window.__POWERED_BY_QIANKUN__;

                // 和主应用一样使用 mode: 'history'
                // 同时需要加前缀，让主要匹配到，从而启用子应用
                const router = new VueRouter({
                    mode: 'history',
                    base: isQianKun ? '/manage' : '/',
                    routes
                })


