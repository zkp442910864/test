import Cache from './util/cache.js';
import Tools from './Tools';
import realtimeLog from './util/realtimeLog';

let config = null;
// 小程序版本号
const globalVersion = '2.0.3';
// 小程序环境（目前定义成两种  生产环境为true， 后面的值可以强制把非生成环境的改成生成环境(主要是好测试)）
const globalNodeEnv = Tools.envVersion ? true : true;
const env = __wxConfig.envVersion;


switch (env) {
    // 线上环境域名';
    case 'release':
        config = {
            // 正式
            apiUrl: 'https://mall.zhongxiang51.com', // 商城请求域名
            webUrl: 'https://static.zhongxiang51.com', // 外链域名
            takeOut: 'https://userside.zhongxiang51.com', // 外卖支付请求域名
            sendFlashUrl: 'https://ss.zhongxiang51.com', // 闪送的域名接口
        };
        break;
    // 体验版环境域名';
    case 'trial':
        config = {
            // 正式
            apiUrl: 'https://mall.zhongxiang51.com', // 商城请求域名
            webUrl: 'https://static.zhongxiang51.com', // 外链域名
            takeOut: 'https://userside.zhongxiang51.com', // 外卖支付请求域名
            sendFlashUrl: 'https://ss.zhongxiang51.com', // 闪送的域名接口

            // 测试
            // apiUrl: 'https://testmall.zhongxiang51.com',
            // webUrl: 'https://testpage.zhongxiang51.com',
            // takeOut: 'https://test.zhongxiang51.com/zxwy-userside',
            // sendFlashUrl: 'https://testss.zhongxiang51.com/zxss-api',
        };
        break;
    // 开发
    case 'develop':
    default:
        config = {
            // 正式
            apiUrl: 'https://mall.zhongxiang51.com', // 商城请求域名
            webUrl: 'https://static.zhongxiang51.com', // 外链域名
            takeOut: 'https://userside.zhongxiang51.com', // 外卖支付请求域名
            sendFlashUrl: 'https://ss.zhongxiang51.com', // 闪送的域名接口

            // 测试
            // apiUrl: 'https://testmall.zhongxiang51.com',
            // webUrl: 'https://testpage.zhongxiang51.com',
            // takeOut: 'https://test.zhongxiang51.com/zxwy-userside',
            // sendFlashUrl: 'https://testss.zhongxiang51.com/zxss-api',

            // 本地开发
            // apiUrl: 'http://mall.gooker.vip',
            // webUrl: 'https://testpage.zhongxiang51.com',
            // takeOut: 'http://userside.gooker.vip',
            // sendFlashUrl: 'http://ss.gooker.vip',

            // 开发
            // apiUrl: 'http://192.169.18.153:28081',
            // apiUrl: 'http://192.169.18.153:18081',
            // 胡
            // apiUrl: 'http://192.169.18.153:8082',
            // apiUrl: 'http://192.169.18.153:8081',
            // 海峰
            // apiUrl: 'http://192.169.18.188:8282',
            // 江阳
            // apiUrl: 'http://192.169.18.75:18282',
            // sendFlashUrl: 'http://192.169.18.155:80/zxss-api',
            // takeOut: 'http://192.169.18.98:8080/zx51-api',
            // 贾
            // apiUrl: 'http://192.169.18.153:8081/order',
            // takeOut: 'http://192.169.18.18:8080/zx51-api',

            // apiUrl: 'https://testmall.zhongxiang51.com',

            // webUrl: 'http://192.169.18.87:8090',
        };
}

// 平台 "devtools"
const platform = wx.getSystemInfoSync().platform;

// 请求的错误拦截
const ajaxErr = {
    successError: {
        code404: '请求地址有误',
        code502: '服务器重启中，请稍后',
        code500: '服务器发生错误'
    },
    failError: [
        {
            key: 'fail request unknow host error',
            text: '请先检查下网络，再重试'
        },
        {
            key: 'fail timeout',
            text: '请求超时，请稍后.'
        },
        {
            key: 'fail socket time out timeout',
            text: '请求超时，请稍后..'
        },
        {
            key: 'request:fail',
            text: '请求超时，请稍后...'
        }
    ],
    // type: successError、 failError
    // err: err(number)  err(String)
    run (type = 'successError', err) {
        if (type === 'successError') {
            err === 502 && Tools.link('/pages/wv/wv?scene=%2Factive.html%23%2FerrorPage%3FjumpAuto%3D1', 2).then(() => {
                wx.hideToast();
                wx.hideLoading();
            });
            return this.successError[`code${err}`];
        } else {
            const item = this.failError.find(ii => err.indexOf(ii.key) > -1);
            return item ? item.text : '';
        }
    }
};

// 为了防止重复跳出登录界面（一个界面多接口问题）
let ajaxTimeOut = null;


const ajax = {
    globalNodeEnv,
    globalVersion,
    config,
    // 定时器数组, 目前没用到
    timeOutArr: [],
    // 缓存请求的线程
    ajaxCache: {},
    // 缓存请求的数据
    ajaxCacheData: {},
    // 常用的清楚缓存键值对
    clearCacheData: {
        personalCenter: `${config.takeOut}/personal/personalCenter`,
        getVip: `${config.takeOut}/personal/getVip`,
        goodsIntegralSignDetail: `${config.takeOut}/personal/integral/sign/detail`,
        categoryMenu: `${config.takeOut}/uc/point/goods/plat/category/menu/v2`,
        allCategoryMenu: `${config.takeOut}/uc/point/goods/plat/category/menu`,
        goodsBrandList: `${config.takeOut}/uc/point/goods/brand/list`,
    },
    // 打印请求和回调信息
    printInfo (type, url, options, params, res) {
        if (platform === 'devtools') return;

        if (type === 1) {
            console.warn('---------------------------请求接口---------------------------');
            console.warn(url);
        } else if (type === 2) {
            console.warn('---------------------------回调参数---------------------------');
            console.warn(url);
            console.warn(`contentType：${options.action || '表单'}`);
            console.warn(params);
            console.warn(res);
        }
    },
    // 清除指定路径的缓存
    clearCacheFun (arrOrStr) {
        let arr = [];
        Array.isArray(arrOrStr) ? arr = arrOrStr : arr.push(arrOrStr);
        arr.forEach((str) => {
            const item = this.clearCacheData[str];
            item && (delete this.ajaxCacheData[item]);
        });
    },
    // 检测缓存的Cache对象数量 不超过50个
    checkAjaxCacheData () {
        const arr = Object.keys(this.ajaxCacheData);
        const len = arr.length;
        const max = 20;
        if (len > max) {
            const delLen = len - max - 1;
            for (let i = delLen; i > -1; i--) {
                delete this.ajaxCacheData[arr[i]];
            }
        }
    },
    // 清楚所有缓存，和在运行中的请求，定时器
    cleareAllCache () {
        // 缓存数据
        for (const i in this.ajaxCacheData) {
            delete this.ajaxCacheData[i];
        }

        // for (const i in this.timeOutArr) {
        //     clearTimeout(this.timeOutArr[i]);
        // }
        // this.timeOutArr = [];

        for (const i in this.ajaxCache) {
            const item = this.ajaxCache[i];
            item && item.abort();
            this.ajaxCache[i] = null;
        }
    },
    // 处理重新登录的处理逻辑
    handleResetLogin (reject, url, params, res, options, unionId, zxToken) {

        // const ajaxCacheObj = this.ajaxCache;
        // for (const i in ajaxCacheObj) {
        //     ajaxCacheObj[i] && ajaxCacheObj[i].abort();
        //     ajaxCacheObj[i] = null;
        // }

        this.cleareAllCache();
        if (ajaxTimeOut) return;
        realtimeLog.error({url, params, res, options, unionId, zxToken, step: 2});

        // if (ajaxTimeOut) {
        //     clearTimeout(ajaxTimeOut);
        //     ajaxTimeOut = null;
        // } else {
        //     this.cleareAllCache();
        // }

        ajaxTimeOut = setTimeout(() => {

            // 登录失效
            const pages = getCurrentPages();
            const page = pages[pages.length - 1];
            const routeArr = [
                'pages/author/phoneLogin/phoneLogin',
                'pages/author/phoneLogin2/phoneLogin2',
            ];
            console.log(page.route);
            if (routeArr.some(ii => page.route === ii)) {
                reject('需要重新登录');
                return;
            }

            // 序列化
            const arr = [];
            for (const i in page.options) {
                const item = page.options[i];
                arr.push(`${i}=${item}`);
            }

            // const unionidToken = Tools.getLocalStorage('unionid_token');
            Tools.clearOtherLocalStorage([
                'curPage', 'qrId', 'parent_id', 'openId', 'locationInfo', 'arkId'
            ]);
            const curPage = Tools.getLocalStorage('curPage');
            // const qrId = Tools.getLocalStorage('qrId');
            // const inviteActId = Tools.getLocalStorage('inviteActId');
            // const parentId = Tools.getLocalStorage('parent_id');
            // const openId = Tools.getLocalStorage('openId');
            // const locationInfo = Tools.getLocalStorage('locationInfo');
            // const arkId = Tools.getLocalStorage('arkId');
            // // const seletedCartList = Tools.getLocalStorage('seletedCartList');
            // Tools.clearLocalStorage();
            // Tools.setLocalStorage('arkId', arkId);
            // Tools.setLocalStorage('locationInfo', locationInfo);
            // // Tools.setLocalStorage('unionid_token', unionidToken);
            // Tools.setLocalStorage('parent_id', parentId);
            // Tools.setLocalStorage('openId', openId);
            // Tools.setLocalStorage('inviteActId', inviteActId);
            // Tools.setLocalStorage('qrId', qrId);
            Tools.setLocalStorage('curPage', curPage || `/${page.route}?${arr.join('&')}`);
            // Tools.setLocalStorage('seletedCartList', seletedCartList);
            Tools.link('/pages/author/phoneLogin/phoneLogin', 1).finally(() => {
                clearTimeout(ajaxTimeOut);
                ajaxTimeOut = null;
            });
            reject('需要重新登录');
        }, 0);
    },
    // 请求错误处理,在 get 和 getAll 里进行处理
    requestHandelError (err) {
        const isErr = typeof err === 'object';
        if (isErr && err.errType === 'success') {
            const errStr = ajaxErr.run('successError', err.statusCode);
            if (errStr) {
                Tools.showToast(`${errStr}`);
            } else {
                Tools.showToast(`${JSON.stringify(err)}`);
            }
        } else if (isErr && err.errType === 'fail' && err.errMsg.indexOf('abort') === -1) {
            const errStr = ajaxErr.run('failError', err.errMsg);
            if (errStr) {
                Tools.showToast(`${errStr}`);
            } else {
                Tools.showToast(`${JSON.stringify(err)}`);
            }
        } else if (isErr && err.code) {
            Tools.showToast(`${isErr ? err.msg : err}`);
        }
    },
    // 1.最初始的请求封装
    requestFun (url, params = {}, options = {}) {
        const zxToken = Tools.getLocalStorage('zx_token') || '';
        const unionId = Tools.getLocalStorage('union_id') || '';
        let contentType = 'application/x-www-form-urlencoded';
        // debugger
        // 是否取消之前(请求中)的请求
        options.isCancelBefore = options.isCancelBefore === undefined ? true : options.isCancelBefore;
        if (options.action === 'json') {
            contentType = 'application/json;charset=UTF-8';
        }

        if (options.target === 'takeOut') {
            params.zx_token = params.zx_token || unionId;
            const isMark = url.indexOf('?') > -1;
            url += `${isMark ? '&' : '?'}zx_token=${params.zx_token}`;
        }

        this.printInfo(1, url, options, params);

        const ajaxCacheKey = `${url}${params.type || ''}`;

        if (this.ajaxCache[ajaxCacheKey] && options.isCancelBefore) {
            this.ajaxCache[ajaxCacheKey].abort();
            this.ajaxCache[ajaxCacheKey] = null;
        }

        delete params.URL;
        return new Promise((reslove, reject) => {
            this.ajaxCache[ajaxCacheKey] = wx.request({
                url: url,
                data: params,
                method: options.method || 'GET',
                header: {
                    'content-type': contentType,
                    Authorization: zxToken
                },
                success: (res) => {
                    // debugger;
                    if (res.statusCode === 200) {
                        const result = res.data;

                        if (result.code === 0 || result.code === 10000) {
                            reslove(result);
                        } else if (result.code === 999 || result.code === 2) {
                            realtimeLog.warn({url, params, res, options, unionId, zxToken, step: 1});
                            this.handleResetLogin(reject, url, params, res, options, unionId, zxToken);
                        } else {
                            reject(result);
                        }
                    } else {
                        res.errType = 'success';
                        reject(res);
                    }
                },
                fail: (res) => {
                    res.errType = 'fail';
                    reject(res);
                },
                complete: (res) => {
                    this.printInfo(2, url, options, params, res);
                    this.ajaxCache[ajaxCacheKey] = null;
                }
            });
        });
    },
    // 2.对 requestFun 进行二次封装，加了缓存数据作用
    request (url, params = {}, options = {}) {
        // options.isRCache 设为true的时候读取缓存数据

        options.target = options.target || 'apiUrl';
        // if (url.indexOf('/order/') > -1) {
        //  // url = 'http://192.169.18.88:18282' + url;
        //  url = 'http://192.169.18.153:8081/order' + url;
        // } else
        // if (url.indexOf('/member/') > -1) {
        //     url = 'http://192.169.18.188:18080' + url.replace('/member/', '/');
        //     // url = 'http://192.169.18.188:18080' + url;
        // } else
        // if (env === 'develop' && (url.indexOf('/up/submitOrder') > -1 || url.indexOf('/up/pay') > -1)) {
        //     url = 'http://192.169.18.18:8080/zx51-api' + url;
        // } else
        // if (url.indexOf('https') !== 0)
        {
            url = this.config[options.target] + url;
        }

        let c = this.ajaxCacheData[url];
        if (!c) {
            c = new Cache((_params, _options) => {
                return this.requestFun(url, _params, _options);
            });
        }
        this.ajaxCacheData[url] = c;
        this.checkAjaxCacheData();
        return c.run(
            Object.assign({URL: url}, params),
            options
            // options.isRCache,
            // options.divide
        );
    },
    // 3.单一请求
    get (url, params = {}, options = {}) {

        if (options.isLoad) Tools.showLoading();

        wx.showNavigationBarLoading();

        return this.request(url, params, options).finally(() => {
            if (options.isLoad) Tools.hideLoading();
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        }).then((res) => {
            return Promise.resolve(res);
        }).catch((err) => {
            if (!options.noErrorTips) {
                this.requestHandelError(err);
            }
            return Promise.reject(err);
        });
    },
    // 4.并发请求
    getAll (arr, {isLoad = true} = {}) {
        // debugger;
        const ajaxArr = arr.map(({url, params = {}, options = {}}) => {
            return this.request(url, params, options).then((res) => {
                return Promise.resolve(res);
            }).catch(options.catch || ((err) => {
                return Promise.reject(err);
            }));
        });

        isLoad && Tools.showLoading();
        wx.showNavigationBarLoading();
        return new Promise((reslove, reject) => {
            Promise.all(ajaxArr).finally(() => {
                isLoad && Tools.hideLoading();
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            }).then((res) => {
                reslove(res);
            }).catch((err) => {
                this.requestHandelError(err);
                reject(err);
            });
        });
    },
    apiPost (url, params, options = {}) {
        options.method = 'POST';
        //  url = this.config['apiUrl'] + url;
        return this.get(url, params, options);
    },
    apiGet (url, params, options = {}) {
        // url = this.config['apiUrl'] + url;
        return this.get(url, params, options);
    },
    apiPut (url, params, options = {}) {
        options.method = 'PUT';
        return this.get(url, params, options);
    },
    apiDel (url, params, options = {}) {
        options.method = 'DELETE';
        return this.get(url, params, options);
    },
};

// export default ajax;
module.exports = ajax;

