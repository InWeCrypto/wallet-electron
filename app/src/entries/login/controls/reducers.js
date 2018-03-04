import { handleActions } from "redux-actions";
import { SIGNIN, RESETPASSWORD } from "./actions";

export const userInfo = handleActions(
	{
		[SIGNIN]: (state, { payload }) => payload
	},
	null
);
