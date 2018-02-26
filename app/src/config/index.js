export const requestUrl = isLocal => {
	return isLocal
		? "http://localhost:14019/"
		: "https://dev.inwecrypto.com:4431/v2/api/";
};
// export const requestUrl = "https://dev.inwecrypto.com:4431/v2/api/";
