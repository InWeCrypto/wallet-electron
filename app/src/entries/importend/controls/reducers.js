import { handleActions } from "redux-actions";
import { IMPORTWALLET, CREATEWALLET, ENCODENEP5 } from "./actions";

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
export const encodeNep = handleActions(
	{
		[ENCODENEP5]: (state, { payload }) => payload
	},
	null
);
