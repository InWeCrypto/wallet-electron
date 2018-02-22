import { createStore as reduxCreateStore, combineReducers } from "redux";
//import createStore from 'redux-async-actions-reducers'
let __store__,
	__reducers__ = {};

const createReducer = reducers => {
	for (let key in reducers) {
		if (__reducers__[key]) return;

		__reducers__[key] =
			typeof reducers[key] === "function"
				? reducers[key]
				: combineReducers(reducers[key]);
	}

	return combineReducers(__reducers__);
};

export const createStore = (reducers, middleware) => {
	const store = reduxCreateStore(createReducer(reducers), middleware);
	__store__ = store;

	return store;
};

export const injectReducer = (key, reducer) => {
	let reducers = {};

	if (typeof key === "string") {
		reducers[key] = reducer;
	} else {
		reducers = key;
	}

	const _reducer = createReducer(reducers);

	if (__store__) {
		__store__.replaceReducer(_reducer);
	}
};
