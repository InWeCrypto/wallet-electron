import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "PROJECT_";
export const GETCODE = `${PRE_FIX}GETCODE`;
export const LOGIN = `${PRE_FIX}LOGIN`;

export const getCode = createAction(GETCODE, params => {
	return http.post({
		url: "get_code",
		params
	});
});
