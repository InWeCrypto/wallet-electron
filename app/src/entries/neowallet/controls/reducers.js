import { handleActions } from "redux-actions";
import {
	WALLETINFO,
	GETWALLETASSETS,
	GETWALLETCONVERSION,
	GETASSETORDERLIST,
	GETNEOUTXO,
	GETGASUTXO,
	SENDNEOORDER
} from "./actions";

export const neoWalletDetailInfo = handleActions(
	{
		[WALLETINFO]: (state, { payload }) => payload
	},
	null
);
export const neoWalletAssets = handleActions(
	{
		[GETWALLETASSETS]: (state, { payload }) => payload
	},
	null
);
export const neoConversion = handleActions(
	{
		[GETWALLETCONVERSION]: (state, { payload }) => payload
	},
	null
);

export const assetsOrderList = handleActions(
	{
		[GETASSETORDERLIST]: (state, { payload }) => payload
	},
	null
);
export const neoUtxo = handleActions(
	{
		[GETNEOUTXO]: (state, { payload }) => payload
	},
	null
);
export const gasUtxo = handleActions(
	{
		[GETGASUTXO]: (state, { payload }) => payload
	},
	null
);
export const sendOrder = handleActions(
	{
		[SENDNEOORDER]: (state, { payload }) => payload
	},
	null
);
