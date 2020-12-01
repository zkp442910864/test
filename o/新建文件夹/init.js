import {storeBindingsBehavior} from 'mobx-miniprogram-bindings';
import mta from './libs/mta_analysis';
import store, {setStore, removeStore, storeData} from './store/index';
import Tools from './Tools';
import ajax from './ajax';
import {recordAdd, shareRecordAdd, setGoodsUnique} from './record';

// console.log(mta);
// 获取当前页
const getCurPage = () => {
    const pages = getCurrentPages();
    return pages[pages.length - 1] || {};
};
// 清除正在请求中的接口
const clearAjax = () => {
    const data = ajax.ajaxCache;
    console.log(data);
    for (const i in data) {
        if (!data[i]) break;
        try {
            data[i].abort();
            data[i] = null;
        } catch (err) {
            data[i] = null;
        }
    }
};
// 强制登录
const forceLogin = () => {
    // debugger;
    if (Tools.getLocalStorage('union_id') && Tools.getLocalStorage('zx_token')) return false;
    // 这些路径不做强置登录
    const routeArr = [
        'pages/author/phoneLogin/phoneLogin',
        'pages/author/phoneLogin2/phoneLogin2',
        'pages/home/home',
        'pages/classify/classify',
        'pages/shopCart/shopCart',
        'pages/my/my',
        'pages/classify/list/list',
        'pages/index/index',
        'packages/home/goodsDetail/index',
    ];
    const page = getCurPage();

    if (~routeArr.indexOf(page.route)) return false;
    // console.log(getCurrentPages());
    clearAjax();

    // Tools.clearLocalStorage();
    // 序列化
    const arr = [];
    for (const i in page.options) {
        const item = page.options[i];
        arr.push(`${i}=${item}`);
    }
    Tools.setLocalStorage('curPage', `/${page.route}?${arr.join('&')}`);
    wx.redirectTo({
        url: '/pages/author/phoneLogin/phoneLogin',
    });
    return true;
};

// 更新操作
(() => {
    // 内存监听
    wx.onMemoryWarning(function (e) {
        console.log(e);
        console.log(Object.keys(ajax.ajaxCacheData));
        console.log('内存警告');
        for (const i in ajax.ajaxCacheData) {
            delete ajax.ajaxCacheData[i];
        }
    });
    // 错误处理
    wx.onError(function (e) {
        console.log(e);
    });
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('请求完新版本信息的回调', res);
    });
    updateManager.onUpdateReady(function () {
        wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    // const unionidToken = Tools.getLocalStorage('unionid_token');
                    // const zxToken = Tools.getLocalStorage('zx_token');
                    // const tokenType = Tools.getLocalStorage('token_type');
                    // const userId = Tools.getLocalStorage('user_id');
                    // const unionId = Tools.getLocalStorage('union_id');
                    // const buildingId = Tools.getLocalStorage('buildingId');
                    // const bindBuilding = Tools.getLocalStorage('bindBuilding');
                    // Tools.clearLocalStorage();
                    // Tools.setLocalStorage('unionid_token', unionidToken);
                    // Tools.setLocalStorage('zx_token', zxToken);
                    // Tools.setLocalStorage('token_type', tokenType);
                    // Tools.setLocalStorage('user_id', userId);
                    // Tools.setLocalStorage('union_id', unionId);
                    // Tools.setLocalStorage('buildingId', buildingId);
                    // Tools.setLocalStorage('bindBuilding', bindBuilding);

                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                }
            }
        });
    });
    updateManager.onUpdateFailed(function () {
        // 新版本下载失败
    });
})();

// 改变Page 函数 全局引入store
(() => {
    var a = Page;
    Page = function (b) {
        Object.assign(b, b.methods);
        delete b.methods;
        var flag = false;

        // await store.getUserInfoStore(true);

        var c = b.onLoad;
        b.onLoad = function (a) {
            console.log('页面onLoad进来' + Date.now());

            store.recordTime = Date.now();
            setStore.call(this);
            setGoodsUnique();

            flag = forceLogin();
            if (!flag) {
                c && c.call(this, a);
            }
        };

        var d = b.onShow;
        b.onShow = function () {
            if (!flag) {
                d && d.call(this);
            }
        };

        var f = b.onHide;
        b.onHide = function () {
            console.log('页面onHide出去' + Date.now());
            recordAdd();

            f && f.call(this);
        };

        var e = b.onUnload;
        b.onUnload = function () {
            console.log('页面onUnload出去' + Date.now());
            recordAdd();

            Tools.hideLoading();
            e && e.call(this);
            removeStore.call(this);
        };

        var g = b.onShareAppMessage;
        b.onShareAppMessage = function (options, a) {
            // console.log(getCurPage());
            shareRecordAdd();
            const obj = (g && g.call(this, options)) || {};
            // console.log(getCurPage());
            // console.log(obj);
            if (obj.path) {
                const is = !!~obj.path.indexOf('?');
                obj.path = `${obj.path}${is ? '&' : '?'}parent_id=${Tools.getLocalStorage('user_id')}`;
            } else {
                const curPage = getCurPage();
                const val = Tools.serialize(Object.assign({
                    parent_id: Tools.getLocalStorage('user_id')
                }, curPage.options));
                // if (val) {
                //     val = `?${val}&parent_id=${Tools.getLocalStorage('user_id')}`;
                // } else {
                //     val = `?parent_id=${Tools.getLocalStorage('user_id')}`;
                // }
                const path = `/${curPage.route}?${val}`;
                obj.path = path;
            }
            console.log(obj);
            return obj;
        };

        a(b);
    };
})();


// 改变Component 函数 全局引入store
(() => {
    const _component = Component;
    Component = function (data) {
        data.behaviors = (data.behaviors || []).concat([storeBindingsBehavior]);
        data.storeBindings = storeData;

        const a = data.created;
        data.created = function () {
            this._oldStore = store;
            a && a.apply(this, arguments);
        };

        const b = data.detached;
        data.detached = function () {
            this._oldStore = null;
            b && b.apply(this, arguments);
        };

        _component(data);
    };
})();


// 兼容
(() => {
    if (typeof Promise.prototype.finally === 'undefined') {
        Promise.prototype.finally = function (callback) {
            const P = this.constructor;
            return this.then(
                value => P.resolve(callback()).then(() => value),
                reason => P.resolve(callback()).then(() => { throw reason; })
            );
        };
    }

    // const oldSplit = Array.prototype.split;
    // Array.prototype.split = function () {
    //     const str = this.toString();
    // };
})();

// mta 埋点
export const mtaFun = (options = {}) => {
    mta.App.init({
        appID: '500686362',
        eventID: '500686405', // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
        lauchOpts: options, // 渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
        statPullDownFresh: true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
        statShareApp: true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
        statReachBottom: true, // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
        autoReport: true, // 开启自动上报
        statParam: true, // 每个页面均加入参数上报
        ignoreParams: [] // statParam为true时，如果不想上报的参数可配置忽略
    });
    return mta;
};

export {getCurPage, clearAjax};
