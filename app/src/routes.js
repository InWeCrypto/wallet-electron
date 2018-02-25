import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "./entries/login";
import Project from "./entries/project";
import Projectlist from "./entries/projectlist";
import Managewallet from "./entries/managewallet";
import Mnemonic from "./entries/mnemonic";
import Mnemonicsure from "./entries/mnemonicsure";
import Keystore from "./entries/keystore";
import Gas from "./entries/gas";
import Addasset from "./entries/addasset";
import Watchmanagewallet from "./entries/watchmanagewallet";
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
import WatchWallet from "./entries/watchwallet";
import TransationDetail from "./entries/transationdetail";
//transationdetail
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Watchmanagewallet} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={Projectlist} />
			<Route path="/managewallet" component={Managewallet} />
			<Route path="/mnemonic" component={Mnemonic} />
			<Route path="/mnemonicsure" component={Mnemonicsure} />
			<Route path="/keystore" component={Keystore} />
			<Route path="/gas" component={Gas} />
			<Route path="/addasset" component={Addasset} />
			<Route path="/watchmanagewallet" component={Watchmanagewallet} />
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
			<Route path="/watchwallet" component={WatchWallet} />
			<Route path="/transationdetail" component={TransationDetail} />
		</Switch>
	);
};
