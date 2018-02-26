import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "WALLET_";
export const GETLIST = `${PRE_FIX}GETLIST`;

export const getWalletList = createAction(GETLIST, params => {
	return http.get({
		url: "wallet",
		params
	});
});
