import { handleActions } from "redux-actions";
import {
	WALLETINFO,
	GETETHWALLETCONVERSION,
	ETHINFO,
	GETETHGAS,
	GETASSETORDERLIST,
	ETHORDER,
	GETETHNONCE,
	CREATEORDER,
	DELETECOIN
} from "./actions";

// export const ethWalletDetailInfo = handleActions(
// 	{
// 		[WALLETINFO]: (state, { payload }) => payload
// 	},
// 	null
// );
export const ethWalletConversion = handleActions(
	{
		[GETETHWALLETCONVERSION]: (state, { payload }) => payload,
		[DELETECOIN]: (state, { payload }) => {
			let list = state.list;
			let arr = list.filter((item, index) => {
				if (item.id != payload.id) {
					return item;
				}
			});
			return { record: state.record, list: arr };
		}
	},
	null
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
