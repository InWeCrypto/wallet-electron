import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "IMPORTKEYSTORE_";
export const CHANGEHOT = `${PRE_FIX}CHANGEHOT`;

export const changeToHot = createAction(CHANGEHOT, params => {
	return http.post(
		{
			url: "wallet/import",
			params
		},
		2
	);
});
