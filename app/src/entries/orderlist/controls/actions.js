import { createAction } from "redux-actions";
import http from "../../../utils/ajax";
const PRE_FIX = "ORDERLIST_";
export const GETORDERLIST = `${PRE_FIX}GETORDERLIST`;
export const GETSTARTORDER = `${PRE_FIX}GETSTARTORDER`;
export const CHANGESHOW = `${PRE_FIX}CHANGESHOW`;

export const MINBLOCK = `${PRE_FIX}MINBLOCK`;
export const GETBLOCKUMBER = `${PRE_FIX}GETBLOCKUMBER`;
export const GETBLOCKSECOND = `${PRE_FIX}GETBLOCKSECOND`;
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
export const getMinBlock = createAction(MINBLOCK, params => {
	return http.get({
		url: "min-block",
		params
	});
});
export const getBlockNumber = createAction(GETBLOCKUMBER, params => {
	return http
		.post({
			url: "extend/blockNumber",
			params
		})
		.then(res => {
			if (res.code === 4000 && res.data && res.data.value) {
				res.data.value = parseInt(Number(res.data.value), 10);
			}
			return res;
		});
});
export const getBlockSecond = createAction(GETBLOCKSECOND, params => {
	return http
		.post({
			url: "extend/blockPerSecond",
			params
		})
		.then(res => {
			if (res.code === 4000) {
				if (res.data.bps < 5000) {
					res.data.bps = 10000;
				}
			}
			return res;
		});
});
