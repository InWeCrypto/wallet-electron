import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

import { Modal } from "antd";

const PRE_FIX = "MNEMONIC_";
export const GETWALLETINFO = `${PRE_FIX}GETWALLETINFO`;

export const getWalletInfo = createAction(GETWALLETINFO, params => {
	return http.get(
		{
			url: `mnemonic/${params.address}/${params.pass}/${params.lang}`
		},
		2
	);
});
