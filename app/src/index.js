import React from "react";
import createHistory from "history/createBrowserHistory";
import { HashRouter as Router } from "react-router-dom";
import storeFun from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { render as domRender } from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import { changeLng, setReduxUserInfo } from "./globalactions";
import { getLocalItem, remFun, addClass } from "./utils/util";

import i18n from "./i18n";
window.i18n = i18n;
const store = storeFun();

let userinfo = getLocalItem("userInfo");
window.store = store;

if (userinfo && userinfo.data) {
	store.dispatch(setReduxUserInfo(JSON.parse(userinfo.data)));
}
const render = Component => {
	domRender(
		<Provider store={store}>
			<Router>
				<Component />
			</Router>
		</Provider>,
		document.getElementById("root")
	);
};

render(Routes);

registerServiceWorker();
