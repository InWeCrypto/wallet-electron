import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "MANAGER_";
export const DELETEWALLET = `${PRE_FIX}DELETEWALLET`;
export const DELETEWALLETSERVER = `${PRE_FIX}DELETEWALLETSERVER`;
export const VAILPASS = `${PRE_FIX}VAILPASS`;

export const deleteLocal = createAction(DELETEWALLET, params => {
	return http.delete(
		{
			url: `wallet/${params.address}`
		},
		2
	);
});
export const deleteSever = createAction(DELETEWALLETSERVER, params => {
	return http.delete({
		url: `wallet/${params.id}`
	});
});
export const vailPass = createAction(VAILPASS, params => {
	return http.get(
		{
			url: `mnemonic/${params.address}/${params.pass}/${params.lang}`
		},
		2
	);
});
