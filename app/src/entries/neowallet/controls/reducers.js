import { handleActions } from "redux-actions";
import { WALLETINFO, GETWALLETASSETS } from "./actions";

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
