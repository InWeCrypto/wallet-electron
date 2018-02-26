import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import "./index.less";
import creatWallet from "#/createwallet_ico.png";
import importWallet from "#/import_wallet_ico.png";
import ledger from "#/ledger_ico.png";
import ledger1 from "#/ledger_ico1.png";
import { toHref } from "../../../../utils/util";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.getWalletList();
	}
	goDetail(item) {
		if (!item) {
			return;
		}
		if (item.category.id === 1) {
			toHref(`ethwallet?id=${item.id}`);
			return;
		}
		if (item.category.id === 2) {
			toHref(`neowallet?id=${item.id}`);
			return;
		}
	}
	render() {
		let { lng, walletList } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<div className="content">
								<div className="wallet">
									<div className="bigtitle">
										{t("wallet.bigTitle", lng)}
									</div>
									<div className="wallet-ctrl">
										<Link
											className="wallet-ctrlbtn"
											to={{
												pathname: "createwallet"
											}}
										>
											<img
												className="walletimg"
												src={creatWallet}
											/>
											<div>
												{t("wallet.createWallet", lng)}
											</div>
										</Link>
										<Link
											to={{
												pathname: "importwallet"
											}}
											className="wallet-ctrlbtn"
										>
											<img
												className="walletimg"
												src={importWallet}
											/>
											<div>
												{t("wallet.importWallet", lng)}
											</div>
										</Link>
										{/* <div className="wallet-ctrlbtn">
											<img
												className="walletimg"
												src={ledger}
											/>
											<div>{t("wallet.ledger", lng)}</div>
                                        </div> */}
										<div className="wallet-ctrlbtn disabled">
											<img
												className="walletimg"
												src={ledger1}
											/>
											<div className="t1">
												<span>
													{t("wallet.ledger", lng)}
												</span>
												<div className="t2">
													{t("wallet.soon", lng)}
												</div>
											</div>
										</div>
									</div>
									<div className="wallet-container">
										<div className="group-title">
											<div className="ui">
												<div className="f1 t1">
													{t(
														"wallet.groupTitle",
														lng
													)}
												</div>
												<span className="t2">
													{t("wallet.groupMore", lng)}
												</span>
											</div>
										</div>
										<div className="group-main">
											{walletList &&
												walletList.list &&
												walletList.list.length > 0 &&
												walletList.list.map(
													(item, index) => {
														return (
															<div
																key={index}
																className="ui center wallet-group"
																onClick={this.goDetail.bind(
																	this,
																	item
																)}
															>
																<img
																	className="wallet-img"
																	src={
																		item.category &&
																		item
																			.category
																			.img
																	}
																/>
																<div className="f1">
																	<div className="wallet-name">
																		{
																			item.name
																		}
																	</div>
																	<div className="wallet-address">
																		{
																			item.address
																		}
																	</div>
																</div>
																<div>
																	<span className="t3">
																		$12222.00
																	</span>
																</div>
															</div>
														);
													}
												)}
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
