import axios from 'axios';
import qs from 'qs';

let domain = null;

switch (process.env.NODE_ENV) {
	// 开发
	case 'development':
		domain = {
			api: 'https://mall.zhongxiang51.com'
		};
		break;
	// 测试
	case 'none':
		domain = {
			api: 'https://mall.zhongxiang51.com'
		};
		break;
	// 正式
	case 'production':
		domain = {
			api: 'https://mall.zhongxiang51.com'
		};
		break;
	default:
		domain = {};
		break;
}

const ajax = {
	// 缓存
	cache: {},
	// 根据 contentType 做统一处理
	action (action) {
		let contentType = null;
		let handleRequest = null;
		switch (action) {
			case 'json':
				contentType = 'application/json;charset=UTF-8';
				handleRequest = (data) => {
					return JSON.stringify(data);
				};
				break;
			default:
				contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
				handleRequest = (data) => {
					return qs.stringify(data);
				};
				break;
		}
		return {contentType, handleRequest};
	},
	get (url, data, options) {
		let load = null;
		const method = options.method || 'get';
		const type = options.type || 'baseApi';
		const token = localStorage.token;
		const {contentType, handleRequest} = this.action(options.action);

		url = domain[type] + url;

		
		if (options.isLoad) {
			load = new common.Loding();
			load.open();
		}
		
		return new Promise((resolve, reject) => {
			if (typeof this.cache[url] === 'function') {
				this.cache[url]();
			}
			this.cache[url] = null;

			axios({
				headers: {
					token,
					'Content-Type': contentType
				},
				method,
				url,
				params: options.params || (method === 'get' ? data : ''),
				data: data || {},
				timeout: 30000,
				transformRequest: [(data) => {
					return handleRequest(data);
				}],
				transformResponse: [(res) => {
					this.cache[url] = null;
					return (typeof res === 'string' ? JSON.parse(res) : res);
				}],
				cancelToken: new axios.CancelToken((c) => {
					this.cache[url] = c;
				})

			}).finally(() => {
				this.cache[url] = null;
				if (load) load.close();
			}).then(response => {
				resolve(response.data);
			}).catch((error) => {
				if (!axios.isCancel(error)) {
					reject(error);
				}
			});
		});
	},
};

const run = (method) => {
	return (url, data, options = {}) => {
		options.method = method;
		options.type = options.type || 'api';
		// console.log(url);
		// console.log(data);
		// console.log(options);
		return ajax.get(url, data, options);
	};
};


const get = run('get');

const post = run('post');

const put = run('put');

const del = run('delete');

export {
	domain, get, post, put, del
};