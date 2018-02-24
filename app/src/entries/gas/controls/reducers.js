import { handleActions } from "redux-actions";
import { GETCODE } from "./actions";

export const code = handleActions(
	{
		[GETCODE]: (state, { payload }) => payload
	},
	[]
);
