import { createAction } from "redux-actions";
import http from "../../../utils/ajax";
const PRE_FIX = "NEOWALLET_";
export const WALLETINFO = `${PRE_FIX}WALLETINFO`;
export const GETWALLETASSETS = `${PRE_FIX}GETWALLETASSETS`;
export const setNeoWalletInfo = createAction(WALLETINFO, params => {
	return params;
});
export const getWalletAssets = createAction(GETWALLETASSETS, params => {
	return http.get({
		url: "user-gnt",
		params
	});
});
