import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PRIVATE_";
export const IMPORTPRIVATE = `${PRE_FIX}IMPORTPRIVATE`;

export const importPrivate = createAction(IMPORTPRIVATE, params => {
	return http.post(
		{
			url: "wallet/import",
			params
		},
		2
	);
});
