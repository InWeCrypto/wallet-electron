import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ETHWALLET_";
export const GETETHWALLETCONVERSION = `${PRE_FIX}GETETHWALLETCONVERSION`;
export const WALLETINFO = `${PRE_FIX}GETETHWALLETDETAIL`;
export const ETHINFO = `${PRE_FIX}GETETHWALLETDETAIL`;

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
