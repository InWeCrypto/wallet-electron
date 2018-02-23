import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "./entries/login";
import Project from "./entries/project";
import Wallet from "./entries/wallet";
import CreateWallet from "./entries/createwallet";
import ImportWallet from "./entries/importwallet";
//authority  addauthor
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/project" component={Project} />
			<Route path="/wallet" component={Wallet} />
			<Route path="/createwallet" component={CreateWallet} />
			<Route path="/importwallet" component={ImportWallet} />
		</Switch>
	);
};
