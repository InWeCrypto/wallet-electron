import "whatwg-fetch";
import Promise from "promise-polyfill";
import { requestUrl } from "../config/";
import { getLocalItem, toHref } from "./util";
import { setReduxUserInfo } from "../globalactions";
import { Modal } from "antd";
const METHODS = ["get", "delete"];
const BODY_METHODS = ["post", "put", "patch"];
if (!Promise) {
	window.Promise = Promise;
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		Msg.alert("服务器错误：" + response.status + "" + response.statusText);
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}

function checkRight(response) {
	//cdy
	if (response.code !== 4000) {
		Modal.warning({
			title: "请求错误",
			content: response.msg
		});
	}
	if (response.code === 4000) {
		return response;
	} else if (response.code === 4001 || response.code === 4010) {
		localStorage.removeItem("userInfo");
		toHref("/");
		store.dispatch(setReduxUserInfo(null));
		return {
			msg: response.msg,
			data: null,
			code: response.code
		};
	} else {
		Msg.prompt(response.msg);
		return {
			msg: response.msg,
			data: null,
			code: response.code
		};
	}
}

function request(method, url, params = {}, header = {}, isLocal = 1) {
	if (isLocal != 2) {
		const languageItem = getLocalItem("language");
		const userInfo = getLocalItem("userInfo");
		const headers = {
			"Content-Type": "application/json",
			lang: languageItem
				? languageItem.data ? languageItem.data : "zh"
				: "zh",
			Accept: "*/*",
			...header,
			"neo-asset-id":
				"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
			"neo-gas-asset-id":
				"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7"
		};
		if (userInfo && userInfo.data) {
			headers.Authorization = JSON.parse(userInfo.data).token;
		}
		let _url = requestUrl(isLocal) + url;
		let body;

		if (METHODS.includes(method)) {
			const _params = [];

			for (let key in params) {
				_params.push(`${key}=${params[key]}`);
			}

			if (_params.length) {
				_url += "?";
				_url += _params.join("&");
			}
		} else {
			body = JSON.stringify(params);
		}

		return fetch(_url, {
			method,
			body,
			headers
		})
			.then(checkStatus)
			.then(parseJSON)
			.then(checkRight);
	} else {
		let body;
		const headers = {
			"Content-Type": "application/json",
			...header
		};
		if (METHODS.includes(method)) {
			const _params = [];

			for (let key in params) {
				_params.push(`${key}=${params[key]}`);
			}

			if (_params.length) {
				_url += "?";
				_url += _params.join("&");
			}
		} else {
			body = JSON.stringify(params);
		}
		let _url = requestUrl(isLocal) + url;
		return fetch(_url, {
			method,
			body,
			headers
		})
			.then(checkStatus)
			.then(parseJSON);
	}
}

const methods = {};

[...METHODS, ...BODY_METHODS].forEach(method => {
	methods[method] = ({ url, params, header }, isLocal) =>
		request(method, url, params, header, isLocal);
});

export default methods;
