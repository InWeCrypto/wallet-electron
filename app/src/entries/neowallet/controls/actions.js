import { createAction } from "redux-actions";
import http from "../../../utils/ajax";
const PRE_FIX = "NEOWALLET_";
export const WALLETINFO = `${PRE_FIX}WALLETINFO`;
export const GETWALLETASSETS = `${PRE_FIX}GETWALLETASSETS`;
export const GETWALLETCONVERSION = `${PRE_FIX}GETWALLETCONVERSION`;

export const GETASSETORDERLIST = `${PRE_FIX}GETASSETLIST`;
export const GETNEOUTXO = `${PRE_FIX}GETNEOUTXO`;
export const GETGASUTXO = `${PRE_FIX}GETGASUTXO`;
export const SENDNEOORDER = `${PRE_FIX}SENDNEOORDER`;
export const CREATEORDER = `${PRE_FIX}CREATEORDER`;

export const setNeoWalletInfo = createAction(WALLETINFO, params => {
	return params;
});
export const getWalletAssets = createAction(GETWALLETASSETS, params => {
	return http.get({ url: "user-gnt", params });
});
export const getNeoWalletConversion = createAction(
	GETWALLETCONVERSION,
	params => {
		return http.get({ url: `conversion/${params.id}` });
	}
);

export const getAssetsOrderList = createAction(GETASSETORDERLIST, params => {
	return http.get({
		url: "wallet-order",
		params
	});
});
export const getNeoUtxo = createAction(GETNEOUTXO, params => {
	return http.get({
		url: `extend/getNeoUtxo?address=${params.address}&type=neo-asset-id`
	});
});
export const getGasUtxo = createAction(GETGASUTXO, params => {
	return http.get({
		url: `extend/getNeoClaimUtxo?address=${
			params.address
		}&type=neo-gas-asset-id`
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
export const createOrder = createAction(CREATEORDER, params => {
	return http.post({
		url: "wallet-order",
		params
	});
});
