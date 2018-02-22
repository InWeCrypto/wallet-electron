import Alert from "antd";

export const getQuery = query => {
	let res = {};
	if (query.indexOf("?") == -1) {
		return res;
	}
	if (!query || query.length === 0) {
		return {};
	}
	let arr = query.split("?")[1].split("&");
	arr.forEach(item => {
		let s = item.split("=");
		res[s[0]] = s[1];
	});
	return res;
};

//获取路由参数
export const getRouteQuery = that => {
	let query = that.props.location.search;
	let res = {};
	if (!query || query.length === 0) {
		return {};
	}
	let arr = query.split("?")[1].split("&");
	arr.forEach(item => {
		let s = item.split("=");
		res[s[0]] = s[1];
	});
	return res;
};
export const getMainMinHeight = () => {
	let header = parseInt(
		document.getElementById("headerBox").offsetHeight,
		10
	);
	let footer =
		document.getElementById("footerBox") &&
		parseInt(document.getElementById("footerBox").offsetHeight, 10);
	let wh = parseInt(window.innerHeight, 10);
	return wh - header - footer;
};
export const formatTimeToChina = t => {
	if (!t) {
		return "";
	}
	t = t.replace("Z", " ") + "Z";
	let now = new Date().getTime();
	let last = new Date(t).getTime();
	let space = parseInt((now - last) / 1000, 10);
	if (space > 60 * 60 * 24 * 30) return "一个月以前";
	if (space > 60 * 60 * 24 * 15) return "十五天以前";
	if (space > 60 * 60 * 24 * 7) return "一周以前";

	if (space > 60 * 60 * 24 * 6) return "六天以前";
	if (space > 60 * 60 * 24 * 5) return "五天以前";
	if (space > 60 * 60 * 24 * 4) return "四天以前";
	if (space > 60 * 60 * 24 * 3) return "三天以前";
	if (space > 60 * 60 * 24 * 2) return "两天以前";
	if (space > 60 * 60 * 24) return "一天以前";

	if (space > 60 * 60 * 12) return "十二小时以前";
	if (space > 60 * 60 * 6) return "六小时以前";
	if (space > 60 * 60 * 3) return "三小时以前";
	if (space > 60 * 60 * 2) return "两小时以前";
	if (space > 60 * 60) return "一小时以前";

	if (space > 60 * 30) return "半小时以前";
	if (space > 60 * 10) return "十分钟以前";
	if (space > 60 * 5) return "五分钟以前";
	if (space > 60 * 3) return "三分钟以前";
	if (space > 60) return "一分钟以前";
	return "刚刚";
};
export const setLocalItem = (key, value, ms) => {
	var curTime = new Date().getTime;
	var extime = null;
	if (ms) {
		extime = key + ms;
	}

	localStorage.setItem(key, JSON.stringify({ data: value, extime: extime }));
};
export const getLocalItem = key => {
	var item = JSON.parse(localStorage.getItem(key));
	if (!item) {
		return null;
	}
	if (!item.extime) {
		return item;
	}
	var curTime = new Date().getTime();
	if (curTime - item.extime <= 0) {
		localStorage.removeItem(key);
		return null;
	} else {
		return item;
	}
};
//cdy
export const remFun = () => {
	if (IsTouchDevice) {
		var dw = document.body.clientWidth;
		dw = dw * 100 / 750;
		document.getElementsByTagName("html")[0].style.fontSize = dw + "px";
	}
};
export const addClass = (ele, cls) => {
	if (!hasClass(ele, cls)) {
		ele.className = ele.className == "" ? cls : ele.className + " " + cls;
	}
};
export const hasClass = (ele, cls) => {
	cls = cls || "";
	if (cls.replace(/\s/g, "").length == 0) return false; //当cls没有参数时，返回false
	return new RegExp(" " + cls + " ").test(" " + ele.className + " ");
};
export const removeClass = (ele, cls) => {
	if (hasClass(ele, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		ele.className = ele.className.replace(reg, " ");
	}
};
export const chargeFooterFixed = () => {
	let headerDom = document.getElementById("headerBox");
	let headerHei = headerDom.offsetHeight;
	let footerDom = document.getElementById("footerBox");
	let footerHei = footerDom.offsetHeight;
	let rootDom = document.getElementById("root");
	let rootHei = rootDom.offsetHeight;
	let screenHei = document.documentElement.clientHeight;
	//if (rootHei < screenHei) {

	document.getElementById("mainBox").style.minHeight =
		screenHei - footerHei - headerHei + "px";
	// } else {
	// 	return false;
	// }
};
export const getLocalTime = time => {
	if (!time) {
		return "";
	}
	let time1 = time;
	if (time1.indexOf("-") != -1) {
		time1 = time.replace(/\-/gi, "/");
	}
	const def = new Date().getTimezoneOffset();
	let localTime = new Date(time1).getTime() - def * 60 * 1000;
	let d = new Date(localTime);
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let day = d.getDate();
	let hours = d.getHours();
	let min = d.getMinutes();
	let s = d.getSeconds();
	return `${year}-${month < 10 ? "0" + month : month}-${
		day < 10 ? "0" + day : day
	} ${hours < 10 ? "0" + hours : hours}:${min < 10 ? "0" + min : min}:${
		s < 10 ? "0" + s : s
	}`;
};
export const queryString = (name, notDecoded) => {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	var encoded = null;

	if (results === null) {
		return "";
	} else {
		encoded = results[1].replace(/\+/g, " ");
		if (notDecoded) {
			return encoded;
		}
		return decodeURIComponent(encoded);
	}
};

export const addFixed2Body = () => {
	let bodyDom = document.getElementsByTagName("body")[0];
	// bodyDom.style.height = "100%";
	// bodyDom.style.overflow = "hidden";
};
export const removeFixed2Body = () => {
	let bodyDom = document.getElementsByTagName("body")[0];
	// bodyDom.style.height = "100%";
	// bodyDom.style.overflow = "hidden";
};

export const isAndroidOrIos = () => {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		return "android";
	} else if (isiOS) {
		return "ios";
	}
};

export const getDownloadSit = () => {
	if (isAndroidOrIos() == "android") {
		return "http://inwecrypto-china.oss-cn-shanghai.aliyuncs.com/inwecrypto.apk";
	} else if (isAndroidOrIos() == "ios") {
		return "";
	}
};

export const openInstallApp = () => {
	let config = {
		scheme_IOS: "schemedemo://",
		scheme_Adr: "schemedemo://",
		timeout: 500
	};

	//创建iframe
	var startTime = Date.now();
	var ifr = document.createElement("iframe");
	ifr.src =
		isAndroidOrIos() == "ios" > 0 ? config.scheme_IOS : config.scheme_Adr;
	ifr.style.display = "none";
	document.body.appendChild(ifr);

	var t = setTimeout(function() {
		var endTime = Date.now();
		if (!startTime || endTime - startTime < config.timeout + 200) {
			window.location = getDownloadSit();
		} else {
		}
	}, config.timeout);
};

//跳转设置
export const toHref = (toSit, query) => {
	let nowL = window.location.href.split("#")[0];
	if (query) {
		window.location.href = nowL + "#" + toSit + "?" + query;
	} else {
		window.location.href = nowL + "#" + toSit;
	}
};
window.toHref = toHref;
