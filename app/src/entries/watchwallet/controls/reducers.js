import { handleActions } from "redux-actions";
import { WALLETINFO, CONVERSION, WALLETLIST } from "./actions";

export const watchInfo = handleActions(
	{
		[WALLETINFO]: (state, { payload }) => payload
	},
	null
);
export const watchConver = handleActions(
	{
		[CONVERSION]: (state, { payload }) => payload
	},
	null
);
export const walletList = handleActions(
	{
		[WALLETLIST]: (state, { payload }) => payload
	},
	null
);
