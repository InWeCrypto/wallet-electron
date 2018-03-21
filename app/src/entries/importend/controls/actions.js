import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "IMPORTEND_";
export const IMPORTWALLET = `${PRE_FIX}IMPORTWALLET`;
export const CREATEWALLET = `${PRE_FIX}CREATEWALLET`;
export const ENCODENEP5 = `${PRE_FIX}ENCODENEP5`;

export const importWallet = createAction(IMPORTWALLET, params => {
	return http.post(
		{
			url: "wallet/import",
			params
		},
		2
	);
});
export const createServerWallet = createAction(CREATEWALLET, params => {
	return http.post({
		url: "wallet",
		params
	});
});
export const decodeNep5 = createAction(ENCODENEP5, params => {
	return http.get(
		{
			url: `neo/address/decode/${params.address}`
		},
		2
	);
});
