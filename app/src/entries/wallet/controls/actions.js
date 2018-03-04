import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "WALLET_";
export const GETLIST = `${PRE_FIX}GETLIST`;
export const GETWALLETCOVERSION = `${PRE_FIX}GETWALLETCOVERSION`;
export const GETWALLETDETAIL = `${PRE_FIX}GETWALLETDETAIL`;

export const getWalletList = createAction(GETLIST, params => {
	return http
		.get({
			url: "wallet",
			params
		})
		.then(res => {
			if (res.code === 4000 && res.data && res.data.list) {
				let list = res.data.list;
				var obj = {};
				list.map((item, index) => {
					obj[item.id] = item;
				});
				localStorage.setItem("walletList", JSON.stringify(list));
				localStorage.setItem("walletObject", JSON.stringify(obj));
			}
			return res;
		});
});
export const getWalletConversion = createAction(GETWALLETCOVERSION, params => {
	return http.get({
		url: "conversion",
		params: {
			wallet_ids: params.ids
		}
	});
});
export const getWalletDetail = createAction(GETWALLETDETAIL, params => {
	return http
		.get({
			url: `conversion/${params.id}`
		})
		.then(res => {
			if (res.code === 4000) {
				return {
					code: 4000,
					data: {
						id: params.id,
						data: res.data.list
					},
					msg: res.msg
				};
			}
			return res;
		});
});
