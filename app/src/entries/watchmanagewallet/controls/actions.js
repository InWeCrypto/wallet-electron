import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "WATCHMANAGEWALLET";
export const DELETEWATCHMANNAGEWALLET = `${PRE_FIX}DELETEWATCHMANNAGEWALLET`;

export const deleteWatchWallet = createAction(
	DELETEWATCHMANNAGEWALLET,
	params => {
		return http.delete({
			url: `wallet/${params.id}`
		});
	}
);
