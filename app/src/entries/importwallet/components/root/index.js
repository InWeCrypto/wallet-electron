import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";
import keyicon from "#/key.png";
import mneicon from "#/mnemonic_ico.png";
import priicon from "#/private_ico.png";
import watchicon from "#/watch_ico.png";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content">
								<div className="importwallet">
									<div className="import-title">
										{t("importWallet.title", lng)}
									</div>
									<div className="import-container">
										<div className="ui jcenter">
											<Link
												to={{
													pathname: "importkeystore"
												}}
												className="import-group"
											>
												<img
													className="importicon"
													src={keyicon}
												/>
												<div className="t1">
													{t(
														"importWallet.keystore",
														lng
													)}
												</div>
											</Link>
											<Link
												to={{
													pathname: "importmnemonic"
												}}
												className="import-group"
											>
												<img
													className="importicon"
													src={mneicon}
												/>
												<div className="t1">
													{t(
														"importWallet.mnemonic",
														lng
													)}
												</div>
											</Link>
										</div>
										<div className="ui jcenter">
											<Link
												to={{
													pathname: "importprivate"
												}}
												className="import-group"
											>
												<img
													className="importicon"
													src={priicon}
												/>
												<div className="t1">
													{t(
														"importWallet.private",
														lng
													)}
												</div>
											</Link>
											<Link
												to={{
													pathname: "importwatch"
												}}
												className="import-group"
											>
												<img
													className="importicon"
													src={watchicon}
												/>
												<div className="t1">
													{t(
														"importWallet.watch",
														lng
													)}
												</div>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
