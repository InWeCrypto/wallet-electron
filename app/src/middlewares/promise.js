import { isFSA } from "flux-standard-action";

function isPromise(val) {
	return val && typeof val.then === "function";
}

export default function promiseMiddleware({ dispatch }) {
	return next => action => {
		if (!isFSA(action)) {
			return isPromise(action) ? action.then(dispatch) : next(action);
		}
		const promise = action.payload;
		if (!isPromise(promise)) return next(action);

		promise.then(res => {
			return next({
				...action,
				payload: res && res.data ? res.data : res
			});
		});

		return promise;
	};
}
