import { handleActions } from "redux-actions";
import {
	GETORDERLIST,
	CHANGESHOW,
	GETSTARTORDER,
	CLEARLIST,
	MINBLOCK,
	GETBLOCKUMBER,
	GETBLOCKSECOND
} from "./actions";

export const orderList = handleActions(
	{
		[GETSTARTORDER]: (state, { payload }) => payload,
		[CLEARLIST]: (state, { payload }) => payload,
		[GETORDERLIST]: (state, { payload }) => {
			if (!state) {
				state = { list: [] };
			}
			let list = [];
			list = [...state.list, ...payload.list];

			return { list: list };
		},
		[CHANGESHOW]: (state, { payload }) => {
			let list = [];
			state.list.map((item, index) => {
				if (index == payload) {
					item.isShowMore = !item.isShowMore;
				} else {
					item.isShowMore = false;
				}

				list.push(item);
			});
			return { list };
		}
	},
	null
);
export const minBlock = handleActions(
	{
		[MINBLOCK]: (state, { payload }) => payload
	},
	null
);
export const currentBlockNumber = handleActions(
	{
		[GETBLOCKUMBER]: (state, { payload }) => payload
	},
	null
);
export const blockSecond = handleActions(
	{
		[GETBLOCKSECOND]: (state, { payload }) => payload
	},
	null
);
