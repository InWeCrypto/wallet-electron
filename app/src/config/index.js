//export const requestUrl = "https://china.inwecrypto.com:4432/v1";
export const requestUrl = isDev => {
	console.log(isDev);
	return isDev
		? "https://dev.inwecrypto.com:4432/v2/"
		: "https://china.inwecrypto.com:4432/v2/";
};
