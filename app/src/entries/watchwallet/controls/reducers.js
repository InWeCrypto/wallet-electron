import { handleActions } from "redux-actions";
import { WALLETINFO, CONVERSION, WALLETLIST, DELETECOIN } from "./actions";

export const watchInfo = handleActions(
	{
		[WALLETINFO]: (state, { payload }) => payload
	},
	null
);
export const watchConver = handleActions(
	{
		[CONVERSION]: (state, { payload }) => payload
	},
	null
);
export const walletList = handleActions(
	{
		[WALLETLIST]: (state, { payload }) => payload,
		[DELETECOIN]: (state, { payload }) => {
			let list = state.list;
			let arr = list.filter((item, index) => {
				if (item.id != payload.id) {
					return item;
				}
			});
			return { record: state.record, list: arr };
		}
	},
	null
);
