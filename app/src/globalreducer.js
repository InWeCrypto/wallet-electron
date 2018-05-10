import { handleActions } from "redux-actions";
import {
	LNG,
	EMAILCODE,
	USERINFO,
	WALLETTYPES,
	NICKNAME,
	USERHEADER,
	SUBMITFEEDBACK
	// HEADERMARKET,
	// RESETPASSWORD,
	// GETIMGOPTION
} from "./globalactions";
export const lng = handleActions(
	{
		[LNG]: (state, { payload }) => {
			return payload;
		}
	},
	"zh"
);
export const userInfo = handleActions(
	{
		[USERINFO]: (state, { payload }) => payload,
		[NICKNAME]: (state, { payload }) => ({
			...state,
			name: payload
		}),
		[USERHEADER]: (state, { payload }) => ({
			...state,
			img: payload
		})
	},
	null
);
export const emailCode = handleActions(
	{
		[EMAILCODE]: (state, { payload }) => payload
	},
	null
);

export const walletTypes = handleActions(
	{
		[WALLETTYPES]: (state, { payload }) => payload
	},
	null
);
export const feedback = handleActions(
	{
		[SUBMITFEEDBACK]: (state, { payload }) => payload
	},
	null
);
// export const commonMarket = handleActions(
// 	{
// 		[HEADERMARKET]: (state, { payload }) => payload
// 	},
// 	null
// );
// export const imgOption = handleActions(
// 	{
// 		[GETIMGOPTION]: (state, { payload }) => payload
// 	},
// 	null
// );
