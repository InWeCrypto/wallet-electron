import { handleActions } from "redux-actions";
import { DELETEWALLET, DELETEWALLETSERVER } from "./actions";

export const deleteLocal = handleActions(
	{
		[DELETEWALLET]: (state, { payload }) => payload
	},
	null
);
export const deleteServer = handleActions(
	{
		[DELETEWALLETSERVER]: (state, { payload }) => payload
	},
	null
);
