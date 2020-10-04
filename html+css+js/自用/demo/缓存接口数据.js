
/**
 * 接口缓存数据
	1.
		const _getBuildingOperationSort = new Cache(getBuildingOperationSort);
	2.
		const _getBuildingOperationSort = new Cache((params) => {
			return getBuildingOperationSort(params);
		});
	执行请求
		_getBuildingOperationSort({a: '1'}).then();
 * @param {*} promiseAjax promise的请求函数
 * @param {*} cacheMax 最大缓存数
 */
// 例子：
// const _getProvinceData = new Cache((params) => {
//     return getProvinceData(params);
// });
// _getProvinceData.run({}).then(res => {})
const Cache = function (promiseAjax, cacheMax = 100) {
    this.cacheMax = cacheMax;
    this.clearAllCache();
    this.promiseAjax = promiseAjax;
}

Cache.prototype = {
    clearAllCache () {
        this.cache = {
            count: 0
        }
    },
    createKey (data) {
        return typeof data === 'object' ? JSON.stringify(data) : data;
    },
    delHead () {
        const arr = Object.entries(this.cache);
        arr.splice(1, 1);
        const obj = {};
        arr.forEach(item => {
            obj[item[0]] = item[1];
        });
        this.cache = obj;
    },
    wCache (index, data) {
        if (this.cache.count > this.cacheMax) {
            this.delHead();
        } else {
            this.cache.count++;
        }
        this.cache[index] = data;
    },
    run (params = 'str', isRCache = true) {
        return new Promise(rel => {
            const index = this.createKey(params);
            const item = this.cache[index];
            if (item && isRCache) {
                rel(item);
            } else {
                this.promiseAjax(params).then(res => {
                    this.wCache(index, res);
                    rel(res);
                })
            }
        });
    },
    constructor: Cache
}
