import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "WATCHWALLET_";
export const WALLETINFO = `${PRE_FIX}WALLETINFO`;
export const CONVERSION = `${PRE_FIX}CONVERSION`;
export const WALLETLIST = `${PRE_FIX}WALLETLIST`;

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
