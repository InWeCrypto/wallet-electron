import { createAction } from "redux-actions";
import http from "./utils/ajax";
import { setLocalItem, getLocalItem } from "./utils/util";
export const LNG = "LNG";
export const USERINFO = "USERINFO";
export const EMAILCODE = "EMAILCODE";
export const WALLETTYPES = "WALLETTYPES";
export const SUBMITFEEDBACK = "SUBMITFEEDBACK";
// export const NICKNAME = "NICKNAME";
// export const USERHEADER = "USERHEADER";
// export const HEADERMARKET = "HEADERMARKET";
// export const GETIMGOPTION = "GETIMGOPTION";
// export const GETIMGOPTIONFILE = "GETIMGOPTIONFILE";
export const changeLng = createAction(LNG, lng => {
	return lng;
});
export const sendEmailCode = createAction(EMAILCODE, (email, type) => {
	return http
		.post(
			{
				url: `send_code/${email}`,
				params: {
					type: type
				}
			},
			3
		)
		.then(res => {
			if (res.code === 4000) {
				Msg.prompt(
					i18n.t("success.emailSend", getLocalItem("language").data)
				);
			} else {
				Msg.prompt(res.msg);
			}
			return res;
		});
});
export const registerUser = createAction(USERINFO, params => {
	return http
		.post(
			{
				url: "register",
				params: params
			},
			3
		)
		.then(res => {
			if (res.code === 4000) {
				setLocalItem("userInfo", JSON.stringify(res.data));
			}
			return res;
		});
});

export const setReduxUserInfo = createAction(USERINFO, data => {
	return data;
});
export const forgetUser = createAction(USERINFO, params => {
	return http
		.post(
			{
				url: "forgot_password",
				params: params
			},
			3
		)
		.then(res => {
			return {
				code: res.code,
				data: null
			};
		});
});
export const resetPassword = createAction(USERINFO, params => {
	return http
		.put({
			url: "user/reset_password",
			params: params
		})
		.then(res => {
			if (res.code === 4000) {
				Msg.prompt(
					i18n.t("success.resetPass", getLocalItem("language").data)
				);
				return res;
			} else {
				Msg.prompt(res.msg);
				return {
					code: res.code,
					data: JSON.parse(getLocalItem("userInfo").data),
					msg: res.msg
				};
			}
		});
});
export const getWalletType = createAction(WALLETTYPES, params => {
	return http.get({
		url: "wallet-category"
	});
});
export const submitFeedBack = createAction(SUBMITFEEDBACK, params => {
	return http.post(
		{
			url: "user/feedbackc",
			params
		},
		3
	);
});
// export const resetNickName = createAction(NICKNAME, params => {
// 	return http
// 		.put({
// 			url: "user",
// 			params: params
// 		})
// 		.then(res => {
// 			if (res.code === 4000) {
// 				setLocalItem("userInfo", JSON.stringify(res.data));
// 			}
// 			return res;
// 		});
// });

// export const uploadHeader = createAction(USERHEADER, img => {
// 	return http
// 		.put({
// 			url: "user",
// 			params: {
// 				img: img
// 			}
// 		})
// 		.then(res => {
// 			if (res.code === 4000) {
// 				return {
// 					code: res.code,
// 					msg: res.msg,
// 					data: img //res.data.img
// 				};
// 			}
// 			return res;
// 		});
// });
// export const getHeaderMarket = createAction(HEADERMARKET, () => {
// 	return http
// 		.get({
// 			url: "category/home_market"
// 		})
// 		.then(res => {
// 			return res;
// 		});
// });

// export const loginIn = createAction(USERINFO, params => {
// 	return http
// 		.post({
// 			url: "login",
// 			params: params
// 		})
// 		.then(res => {
// 			if (res.code === 4000) {
// 				setLocalItem("userInfo", JSON.stringify(res.data));
// 			}
// 			return res;
// 		});
// });
// export const getImgOption = createAction(GETIMGOPTION, params => {
// 	return http.get({
// 		url: "upload/img?get_oss_policy",
// 		params
// 	});
// });

//获取阿里云file
// export const getFileOption = createAction(GETIMGOPTIONFILE, params => {
// 	return http.get({
// 		url: "upload/file?get_oss_policy",
// 		params
// 	});
// });
