import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "GAS_";
export const GETGASINFO = `${PRE_FIX}GETGASINFO`;
export const GETNEOUTXO = `${PRE_FIX}GETNEOUTXO`;
export const GETGASUTXO = `${PRE_FIX}GETGASUTXO`;
export const SENDNEOORDER = `${PRE_FIX}SENDNEOORDER`;
export const SENDGASORDER = `${PRE_FIX}SENDGASORDER`;
export const CREATEGASORDER = `${PRE_FIX}CREATEGASORDER`;
export const GETASSETORDERLIST = `${PRE_FIX}GETASSETORDERLIST`;

export const getGasInfo = createAction(GETGASINFO, params => {
	return http.get({
		url: `conversion/${params.id}`
	});
});
export const getNeoUtxo = createAction(GETNEOUTXO, params => {
	return http.get({
		url: `extend/getNeoUtxo?address=${params.address}&type=${params.type}`
	});
});
export const getGasUtxo = createAction(GETGASUTXO, params => {
	return http.get({
		url: `extend/getNeoClaimUtxo?address=${params.address}`
	});
});
export const sendNeoOrader = createAction(SENDNEOORDER, params => {
	return http.post(
		{
			url: "neo/tx/",
			params
		},
		2
	);
});
export const sendGasOrder = createAction(SENDGASORDER, params => {
	return http.post(
		{
			url: "neo/claim",
			params
		},
		2
	);
});
export const createGasOrder = createAction(CREATEGASORDER, params => {
	return http.post({
		url: "wallet-order",
		params
	});
});

export const getAssetsOrderList = createAction(GETASSETORDERLIST, params => {
	return http.get({
		url: "wallet-order",
		params
	});
});
