import { handleActions } from "redux-actions";
import { GETWALLETINFO } from "./actions";

export const walletInfo = handleActions(
	{
		[GETWALLETINFO]: (state, { payload }) => payload
	},
	null
);
