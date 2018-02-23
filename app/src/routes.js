import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "./entries/login";
import Project from "./entries/project";
import Projectlist from "./entries/projectlist";
import Wallet from "./entries/wallet";
import CreateWallet from "./entries/createwallet";
import ImportWallet from "./entries/importwallet";
import ImportKeystore from "./entries/importkeystore";
//authority  addauthor
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Projectlist} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={Projectlist} />
			<Route path="/wallet" component={Wallet} />
			<Route path="/createwallet" component={CreateWallet} />
			<Route path="/importwallet" component={ImportWallet} />
			<Route path="/importkeystore" component={ImportKeystore} />
		</Switch>
	);
};
