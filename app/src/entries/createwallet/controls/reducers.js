import { handleActions } from "redux-actions";
import { CREATE } from "./actions";

export const createWalletR = handleActions(
	{
		[CREATE]: (state, { payload }) => payload
	},
	[]
);
