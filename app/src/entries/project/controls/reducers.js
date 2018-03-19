import { handleActions } from "redux-actions";
import { GETSEARCHHISTORY, GETSEARCHRESULT } from "./actions";

export const searchHistory = handleActions(
	{
		[GETSEARCHHISTORY]: (state, { payload }) => payload
	},
	null
);
export const searchResult = handleActions(
	{
		[GETSEARCHRESULT]: (state, { payload }) => payload
	},
	null
);
