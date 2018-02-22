import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "./entries/login";
import Project from "./entries/project";

//authority  addauthor
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Project} />
			<Route path="/project" component={Project} />
		</Switch>
	);
};
