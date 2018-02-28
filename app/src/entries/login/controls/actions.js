import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "LOGIN_";
export const GETCODE = `${PRE_FIX}GETCODE`;
export const LOGIN = `${PRE_FIX}LOGIN`;

export const getCode = createAction(GETCODE, params => {
	return http
		.post({
			url: "get_code",
			params
		})
		.then(res => {
			if (res.code === 4000) {
				Msg.prompt("发送成功请注意查收");
			}
			return res;
		});
});
