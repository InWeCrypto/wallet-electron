import { handleActions } from "redux-actions";
import {
	GETGASINFO,
	GETGASUTXO,
	GETNEOUTXO,
	SENDNEOORDER,
	SENDGASORDER,
	CREATEGASORDER,
	GETASSETORDERLIST
} from "./actions";

export const gasInfo = handleActions(
	{
		[GETGASINFO]: (state, { payload }) => payload
	},
	null
);
export const gasUtxo = handleActions(
	{
		[GETGASUTXO]: (state, { payload }) => payload
	},
	null
);
export const neoUtxo = handleActions(
	{
		[GETNEOUTXO]: (state, { payload }) => payload
	},
	null
);
export const neoOrder = handleActions(
	{
		[SENDNEOORDER]: (state, { payload }) => payload
	},
	null
);
export const gasOrder = handleActions(
	{
		[SENDGASORDER]: (state, { payload }) => payload
	},
	null
);
export const createGasOrder = handleActions(
	{
		[CREATEGASORDER]: (state, { payload }) => payload
	},
	null
);
export const assetList = handleActions(
	{
		[GETASSETORDERLIST]: (state, { payload }) => payload
	},
	null
);
