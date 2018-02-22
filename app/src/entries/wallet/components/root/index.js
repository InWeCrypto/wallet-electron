import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import "./index.less";
import creatWallet from "#/createwallet_ico.png";
import importWallet from "#/import_wallet_ico.png";
import ledger from "#/ledger_ico.png";
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
					<div className="wallet">
						<div className="bigtitle">
							{t("wallet.bigTitle", lng)}
						</div>
						<div className="wallet-ctrl">
							<div className="wallet-ctrlbtn">
								<img className="walletimg" src={creatWallet} />
								<div>{t("wallet.createWallet", lng)}</div>
							</div>
							<div className="wallet-ctrlbtn">
								<img className="walletimg" src={importWallet} />
								<div>{t("wallet.importWallet", lng)}</div>
							</div>
							<div className="wallet-ctrlbtn">
								<img className="walletimg" src={ledger} />
								<div>{t("wallet.ledger", lng)}</div>
							</div>
						</div>
						<div className="wallet-container">
							<div className="group-title">
								<div className="ui">
									<div className="f1 t1">
										{t("wallet.groupTitle", lng)}
									</div>
									<span className="t2">
										{t("wallet.groupMore", lng)}
									</span>
								</div>
							</div>
							<div className="group-main">
								<div className="ui center wallet-group">
									<img
										className="wallet-img"
										src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=216453846,3984923503&fm=173&s=9F3E6F80D0836AE609A50CC30300E093&w=218&h=146&img.JPEG"
									/>
									<div className="f1">
										<div className="wallet-name">2</div>
										<div className="wallet-address">2</div>
									</div>
									<div>
										<span className="t3">$12222.00</span>
									</div>
								</div>
								<div className="ui center wallet-group">
									<img
										className="wallet-img"
										src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=216453846,3984923503&fm=173&s=9F3E6F80D0836AE609A50CC30300E093&w=218&h=146&img.JPEG"
									/>
									<div className="f1">
										<div className="wallet-name">2</div>
										<div className="wallet-address">2</div>
									</div>
									<div>
										<span className="t3">$12222.00</span>
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
