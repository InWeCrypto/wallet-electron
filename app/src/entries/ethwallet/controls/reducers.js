import { handleActions } from "redux-actions";
import { WALLETINFO, GETETHWALLETCONVERSION } from "./actions";

export const ethWalletDetailInfo = handleActions(
	{
		[WALLETINFO]: (state, { payload }) => payload
	},
	null
);
export const ethWalletConversion = handleActions(
	{
		[GETETHWALLETCONVERSION]: (state, { payload }) => payload
	},
	[]
);
