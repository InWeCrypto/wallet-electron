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
import Item from "antd/lib/list/Item";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			walletId: null
		};
	}
	componentDidMount() {
		this.props.getWalletType();
	}
	chooseType(item) {
		this.setState({
			type: 2,
			walletId: item.id
		});
	}
	render() {
		let { lng, walletTypes } = this.props;
		let { type, walletId } = this.state;
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
									{type == 1 && (
										<div className="wallet-type">
											{walletTypes &&
												walletTypes.length > 0 &&
												walletTypes.map(
													(item, index) => {
														return (
															<div
																key={index}
																className="type-item"
																onClick={this.chooseType.bind(
																	this,
																	item
																)}
															>
																<img
																	src={
																		item.img
																	}
																/>
																<div className="t">
																	{item.name}
																</div>
															</div>
														);
													}
												)}
										</div>
									)}
									{type == 2 && (
										<div className="import-container">
											<div className="ui jcenter">
												<Link
													to={{
														pathname:
															"importkeystore",
														search: `?wallettype=${walletId}`
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
														pathname:
															"importmnemonic",
														search: `?wallettype=${walletId}`
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
														pathname:
															"importprivate",
														search: `?wallettype=${walletId}`
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
														pathname: "importwatch",
														search: `?wallettype=${walletId}`
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
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
