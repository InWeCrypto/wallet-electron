import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "./entries/login";

//authority  addauthor
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
		</Switch>
	);
};
