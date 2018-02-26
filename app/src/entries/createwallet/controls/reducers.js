import { handleActions } from "redux-actions";
import { CREATE, GETADDRESS } from "./actions";

export const createWalletR = handleActions(
	{
		[CREATE]: (state, { payload }) => payload
	},
	null
);
export const createAddress = handleActions(
	{
		[GETADDRESS]: (state, { payload }) => payload
	},
	null
);
