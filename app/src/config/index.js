export const requestUrl = isLocal => {
	var isDev = JSON.parse(localStorage.getItem("isDev")) ? true : false;
	if (isDev) {
		switch (isLocal) {
			case 1:
				return "https://dev.inwecrypto.com:4431/v2/api/";
			case 2:
				return "http://localhost:14019/";
			case 3:
				return "https://dev.inwecrypto.com:4431/v2/";
		}
	}
};
