import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { I18n } from "react-i18next";
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
					<div className="importwallet">
						<div className="import-title">
							{t("importWallet.title", lng)}
						</div>
						<div className="import-container">
							<div className="ui jcenter">
								<div className="import-group">
									<img className="importicon" src={keyicon} />
									<div className="t1">
										{t("importWallet.keystore", lng)}
									</div>
								</div>
								<div className="import-group">
									<img className="importicon" src={mneicon} />
									<div className="t1">
										{t("importWallet.mnemonic", lng)}
									</div>
								</div>
							</div>
							<div className="ui jcenter">
								<div className="import-group">
									<img className="importicon" src={priicon} />
									<div className="t1">
										{t("importWallet.private", lng)}
									</div>
								</div>
								<div className="import-group">
									<img
										className="importicon"
										src={watchicon}
									/>
									<div className="t1">
										{t("importWallet.watch", lng)}
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
