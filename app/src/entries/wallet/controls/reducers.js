import { handleActions } from "redux-actions";
import { GETLIST, GETWALLETCOVERSION, GETWALLETDETAIL } from "./actions";

export const walletList = handleActions(
	{
		[GETLIST]: (state, { payload }) => payload
	},
	null
);
export const walletConversion = handleActions(
	{
		[GETWALLETCOVERSION]: (state, { payload }) => payload
	},
	null
);
export const walletDetail = handleActions(
	{
		[GETWALLETDETAIL]: (state, { payload }) => {
			let obj = {};
			obj[payload.id] = payload.data;
			return { ...state, ...obj };
		}
	},
	null
);
