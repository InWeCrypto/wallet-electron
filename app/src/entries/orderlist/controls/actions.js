import { createAction } from "redux-actions";
import http from "../../../utils/ajax";
const PRE_FIX = "ORDERLIST_";
export const GETORDERLIST = `${PRE_FIX}GETORDERLIST`;
export const GETSTARTORDER = `${PRE_FIX}GETSTARTORDER`;
export const CHANGESHOW = `${PRE_FIX}CHANGESHOW`;
export const getStartOrderList = createAction(GETSTARTORDER, params => {
	return http
		.get({
			url: "wallet-order",
			params
		})
		.then(res => {
			if (res.code === 4000 && res.data && res.data.list) {
				res.data.list.map((item, index) => {
					item.isShowMore = false;
				});
			}
			return res;
		});
});
export const getOrderList = createAction(GETORDERLIST, params => {
	return http
		.get({
			url: "wallet-order",
			params
		})
		.then(res => {
			if (res.code === 4000 && res.data && res.data.list) {
				res.data.list.map((item, index) => {
					item.isShowMore = false;
				});
			}
			return res;
		});
});
export const changeShow = createAction(CHANGESHOW, idx => {
	return idx;
});
