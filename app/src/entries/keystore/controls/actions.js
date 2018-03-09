import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "KEYSTORE_";
export const GETWALLETDETAIL = `${PRE_FIX}GETCODE`;

export const getWalletDetail = createAction(GETWALLETDETAIL, params => {
	return http.get(
		{
			url: `wallet/${params.address}`
		},
		2
	);
});
