import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, compose } from "redux";
import { createStore } from "./utils/injectReducer";
import thunkMiddleware from "./middlewares/thunk";
import promiseMiddleware from "./middlewares/promise";

const middlewareList = [thunkMiddleware, promiseMiddleware];

let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	store = history => {
		return createStore(
			{
				routing: routerReducer
			},
			compose(
				applyMiddleware(routerMiddleware(history), ...middlewareList),
				window.__REDUX_DEVTOOLS_EXTENSION__ &&
					window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		);
	};
} else {
	store = history => {
		return createStore(
			{
				routing: routerReducer
			},
			applyMiddleware(routerMiddleware(history), ...middlewareList)
		);
	};
}

export default store;
