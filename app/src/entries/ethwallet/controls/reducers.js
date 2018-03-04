import { handleActions } from "redux-actions";
import { WALLETINFO, GETETHWALLETCONVERSION, ETHINFO } from "./actions";

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
export const ethConversion = handleActions(
	{
		[ETHINFO]: (state, { payload }) => payload
	},
	null
);
