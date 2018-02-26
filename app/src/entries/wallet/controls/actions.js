import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "WALLET_";
export const GETLIST = `${PRE_FIX}GETLIST`;

export const getWalletList = createAction(GETLIST, params => {
	return http
		.get({
			url: "wallet",
			params
		})
		.then(res => {
			if (res.code === 4000 && res.data && res.data.list) {
				let list = res.data.list;
				var obj = {};
				list.map((item, index) => {
					obj[item.id] = item;
				});
				localStorage.setItem("walletList", JSON.stringify(list));
				localStorage.setItem("walletObject", JSON.stringify(obj));
			}
			return res;
		});
});
