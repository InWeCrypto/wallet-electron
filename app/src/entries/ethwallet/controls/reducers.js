import { handleActions } from "redux-actions";
import {
	WALLETINFO,
	GETETHWALLETCONVERSION,
	ETHINFO,
	GETETHGAS,
	GETASSETORDERLIST,
	ETHORDER,
	GETETHNONCE,
	CREATEORDER
} from "./actions";

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
export const ethGasNum = handleActions(
	{
		[GETETHGAS]: (state, { payload }) => payload
	},
	null
);
export const assetsOrderList = handleActions(
	{
		[GETASSETORDERLIST]: (state, { payload }) => payload
	},
	null
);
export const ethOrder = handleActions(
	{
		[ETHORDER]: (state, { payload }) => payload
	},
	null
);
export const ethNonce = handleActions(
	{
		[GETETHNONCE]: (state, { payload }) => payload
	},
	null
);
export const createOrder = handleActions(
	{
		[CREATEORDER]: (state, { payload }) => payload
	},
	null
);
