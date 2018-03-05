import { handleActions } from "redux-actions";
import { IMPORTWALLET, CREATEWALLET } from "./actions";

export const importw = handleActions(
	{
		[IMPORTWALLET]: (state, { payload }) => payload
	},
	null
);
export const createw = handleActions(
	{
		[CREATEWALLET]: (state, { payload }) => payload
	},
	null
);
