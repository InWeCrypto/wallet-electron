import { handleActions } from "redux-actions";
import { GETASSETLIST, CHECKASSETLIST } from "./actions";

export const assetsList = handleActions(
	{
		[GETASSETLIST]: (state, { payload }) => payload,
		[CHECKASSETLIST]: (state, { payload }) => {
			let list = state.list.map((item, index) => {
				if (item.id === payload.id) {
					item.isCheck = payload.state;
				}
				return item;
			});
			return { ...state, list: [...list] };
		}
	},
	null
);
