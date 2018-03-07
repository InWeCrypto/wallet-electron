import { handleActions } from "redux-actions";
import { CHANGEHOT } from "./actions";

export const importKey = handleActions(
	{
		[CHANGEHOT]: (state, { payload }) => payload
	},
	null
);
