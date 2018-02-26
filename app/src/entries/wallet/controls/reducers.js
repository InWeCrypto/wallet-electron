import { handleActions } from "redux-actions";
import { GETLIST } from "./actions";

export const walletList = handleActions(
	{
		[GETLIST]: (state, { payload }) => payload
	},
	[]
);
