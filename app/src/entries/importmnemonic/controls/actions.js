import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "IMPORTMEMO_";
export const IMPORTWALLET = `${PRE_FIX}IMPORTWALLET`;

export const changeToHot = createAction(IMPORTWALLET, params => {
	return http.post(
		{
			url: "wallet/import",
			params
		},
		2
	);
});
