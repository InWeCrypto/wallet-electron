import { handleActions } from "redux-actions";
import { IMPORTPRIVATE } from "./actions";

export const importPrivate = handleActions(
	{
		[IMPORTPRIVATE]: (state, { payload }) => payload
	},
	null
);
