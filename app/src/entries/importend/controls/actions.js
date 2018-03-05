import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "IMPORTEND_";
export const IMPORTWALLET = `${PRE_FIX}IMPORTWALLET`;
export const CREATEWALLET = `${PRE_FIX}CREATEWALLET`;

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
