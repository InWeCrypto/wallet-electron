import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "PROJECT_";
export const GETSEARCHHISTORY = `${PRE_FIX}GETSEARCHHISTORY`;
export const GETSEARCHRESULT = `${PRE_FIX}GETSEARCHRESULT`;

export const getSearchHistory = createAction(GETSEARCHHISTORY, params => {
	return http.get(
		{
			url: "search/keywords"
		},
		3
	);
});
export const getSearchResult = createAction(GETSEARCHRESULT, params => {
	return http.get(
		{
			url: `category?keyword=${params.keywords}`
		},
		3
	);
});
