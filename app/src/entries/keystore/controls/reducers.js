import { handleActions } from "redux-actions";
import { GETWALLETDETAIL } from "./actions";

export const walletDetail = handleActions(
	{
		[GETWALLETDETAIL]: (state, { payload }) => payload
	},
	null
);
