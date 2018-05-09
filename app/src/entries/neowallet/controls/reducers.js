import { handleActions } from "redux-actions";
import {
	WALLETINFO,
	GETWALLETASSETS,
	GETWALLETCONVERSION,
	GETASSETORDERLIST,
	GETNEOUTXO,
	GETGASUTXO,
	DELETECOIN,
	SENDNEOORDER,
	CREATEORDER
} from "./actions";

// export const neoWalletDetailInfo = handleActions(
// 	{
// 		[WALLETINFO]: (state, { payload }) => payload
// 	},
// 	null
// );
export const neoWalletAssets = handleActions(
	{
		[GETWALLETASSETS]: (state, { payload }) => payload
	},
	null
);
export const neoConversion = handleActions(
	{
		[GETWALLETCONVERSION]: (state, { payload }) => payload,
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
export const createOrder = handleActions(
	{
		[CREATEORDER]: (state, { payload }) => payload
	},
	null
);
