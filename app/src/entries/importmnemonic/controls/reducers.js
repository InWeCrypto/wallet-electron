import { handleActions } from "redux-actions";
import { IMPORTWALLET } from "./actions";

export const changHot = handleActions(
	{
		[IMPORTWALLET]: (state, { payload }) => payload
	},
	null
);
