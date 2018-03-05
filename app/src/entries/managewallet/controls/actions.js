import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "MANAGER_";
export const DELETEWALLET = `${PRE_FIX}DELETEWALLET`;

export const getCode = createAction(DELETEWALLET, params => {
	return http.post({
		url: "get_code",
		params
	});
});
