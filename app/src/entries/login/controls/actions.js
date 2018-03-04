import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "LOGIN_";
export const SIGNIN = `${PRE_FIX}SIGNIN`;
export const RESETPASSWORD = `${PRE_FIX}RESETPASSWORD`;

export const signIn = createAction(SIGNIN, params => {
	return http.post(
		{
			url: "login",
			params
		},
		3
	);
});
//
