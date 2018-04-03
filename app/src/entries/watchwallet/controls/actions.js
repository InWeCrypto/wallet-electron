import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "WATCHWALLET_";
export const WALLETINFO = `${PRE_FIX}WALLETINFO`;
export const CONVERSION = `${PRE_FIX}CONVERSION`;
export const WALLETLIST = `${PRE_FIX}WALLETLIST`;
export const DELETECOIN = `${PRE_FIX}DELETECOIN`;

export const setInfo = createAction(WALLETINFO, obj => {
	return {
		...obj
	};
});
export const getConversion = createAction(CONVERSION, params => {
	return http.get({
		url: "conversion",
		params: {
			wallet_ids: params.ids
		}
	});
});
export const getWalletList = createAction(WALLETLIST, params => {
	return http.get({
		url: `conversion/${params.id}`
	});
});
export const deleteCoin = createAction(DELETECOIN, params => {
	return http
		.delete({
			url: `user-gnt/${params.id}`
		})
		.then(res => {
			if (res.code === 4000) {
				return {
					msg: res.msg,
					code: res.code,
					data: {
						id: params.id
					}
				};
			}
			return res;
		});
});
