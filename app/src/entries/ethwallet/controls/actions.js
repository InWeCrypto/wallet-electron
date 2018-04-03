import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ETHWALLET_";
export const GETETHWALLETCONVERSION = `${PRE_FIX}GETETHWALLETCONVERSION`;
export const WALLETINFO = `${PRE_FIX}WALLETINFO`;
export const ETHINFO = `${PRE_FIX}ETHINFO`;
export const GETETHGAS = `${PRE_FIX}GETETHGAS`;
export const GETASSETORDERLIST = `${PRE_FIX}GETASSETORDERLIST`;
export const GETETHUTXO = `${PRE_FIX}GETETHUTXO`;
export const ETHORDER = `${PRE_FIX}ETHORDER`;
export const GETETHNONCE = `${PRE_FIX}GETETHNONCE`;
export const CREATEORDER = `${PRE_FIX}CREATEORDER`;
export const DELETECOIN = `${PRE_FIX}DELETECOIN`;

export const setEthWalletInfo = createAction(WALLETINFO, params => {
	return params;
});

export const getEthWalletConversion = createAction(
	GETETHWALLETCONVERSION,
	params => {
		return http.get({
			url: `conversion/${params.id}`
		});
	}
);
export const getEthConversion = createAction(ETHINFO, params => {
	return http.get({
		url: "conversion",
		params: {
			wallet_ids: params.ids
		}
	});
});
export const getEthGas = createAction(GETETHGAS, params => {
	return http.get({
		url: `extend/getGasPrice`
	});
});
export const getAssetsOrderList = createAction(GETASSETORDERLIST, params => {
	return http.get({
		url: "wallet-order",
		params
	});
});
export const setEthOrder = createAction(ETHORDER, params => {
	return http.post(
		{
			url: "eth/tx/",
			params
		},
		2
	);
});
export const getEthNonce = createAction(GETETHNONCE, params => {
	return http.post({
		url: "extend/getTransactionCount",
		params
	});
});
export const createOrder = createAction(CREATEORDER, params => {
	return http.post({
		url: "wallet-order",
		params
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
