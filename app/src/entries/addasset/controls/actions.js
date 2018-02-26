import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "ADDASSET_";
export const GETASSETLIST = `${PRE_FIX}GETASSETLIST`;
export const CHECKASSETLIST = `${PRE_FIX}CHECKASSETLIST`;
export const getAssetsList = createAction(GETASSETLIST, params => {
	return http
		.get({
			url: "gnt-category",
			params
		})
		.then(res => {
			if (
				res.code === 4000 &&
				res.data &&
				res.data.list &&
				res.data.list.length > 0
			) {
				res.data.list.map((item, index) => {
					item.isCheck = false;
				});
			}
			return res;
		});
});
export const checkChange = createAction(CHECKASSETLIST, params => {
	return params;
});
