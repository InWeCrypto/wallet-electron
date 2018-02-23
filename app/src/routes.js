import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "./entries/login";
import Project from "./entries/project";
import Projectlist from "./entries/projectlist";
import Wallet from "./entries/wallet";
import CreateWallet from "./entries/createwallet";
import ImportWallet from "./entries/importwallet";
import ImportKeystore from "./entries/importkeystore";
import ImportMnemonic from "./entries/importmnemonic";
import ImportPrivate from "./entries/importprivate";
import ImportWatch from "./entries/importwatch";
import ImportEnd from "./entries/importend";
import NeoWallet from "./entries/neowallet";
import EthWallet from "./entries/ethwallet";
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
			<Route path="/importmnemonic" component={ImportMnemonic} />
			<Route path="/importprivate" component={ImportPrivate} />
			<Route path="/importwatch" component={ImportWatch} />
			<Route path="/importend" component={ImportEnd} />
			<Route path="/neowallet" component={NeoWallet} />
			<Route path="/ethwallet" component={EthWallet} />
		</Switch>
	);
};
