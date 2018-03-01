export const requestUrl = isLocal => {
	return isLocal;
	// ? "http://localhost:14019/"
	// : "https://dev.inwecrypto.com:4431/v2/api/";
	switch (isLocal) {
		case 1:
			return "https://dev.inwecrypto.com:4431/v2/api/";
		case 2:
			return "http://localhost:14019/";
		case 3:
			return "https://dev.inwecrypto.com:4431/v2/";
	}
};
// export const requestUrl = "https://dev.inwecrypto.com:4431/v2/api/";
