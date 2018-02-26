import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "CREATEWALLET_";
export const CREATE = `${PRE_FIX}CREATE`;

export const createWallet = createAction(CREATE, params => {
	return http.post({
		url: "wallet",
		params
	});
});
