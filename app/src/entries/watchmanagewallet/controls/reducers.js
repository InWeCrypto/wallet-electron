import { handleActions } from "redux-actions";
import { DELETEWATCHMANNAGEWALLET } from "./actions";

export const watchWallet = handleActions(
	{
		[DELETEWATCHMANNAGEWALLET]: (state, { payload }) => payload
	},
	null
);
