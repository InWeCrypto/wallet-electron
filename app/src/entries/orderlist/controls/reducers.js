import { handleActions } from "redux-actions";
import { GETORDERLIST, CHANGESHOW } from "./actions";

export const orderList = handleActions(
	{
		[GETORDERLIST]: (state, { payload }) => payload,
		[CHANGESHOW]: (state, { payload }) => {
			let list = [];
			state.list.map((item, index) => {
				if (index == payload) {
					item.isShowMore = !item.isShowMore;
				}
				list.push(item);
			});
			return { list: list };
		}
	},
	null
);
