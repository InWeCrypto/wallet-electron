import { createAction } from "redux-actions";
import http from "../../../utils/ajax";
const PRE_FIX = "NEOWALLET_";
export const WALLETINFO = `${PRE_FIX}WALLETINFO`;

export const setNeoWalletInfo = createAction(WALLETINFO, params => {
	return params;
});
