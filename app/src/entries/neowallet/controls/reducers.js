import { handleActions } from "redux-actions";
import { WALLETINFO } from "./actions";

export const neoWalletDetailInfo = handleActions(
	{
		[WALLETINFO]: (state, { payload }) => payload
	},
	null
);
