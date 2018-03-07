import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
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
		this.props.getWalletList().then(res => {
			if (res.code === 4000) {
				let list = [];
				res.data.list.map((item, index) => {
					list.push(item.id);
				});
				this.props
					.getWalletConversion({ ids: `[${list.join(",")}]` })
					.then(res => {
						if (res.code === 4000) {
							let dlist = [];
							res.data.list.map((item, index) => {
								this.props.getWalletDetail({
									id: item.id
								});
							});
						}
					});
			}
		});
		this.props.getLocalList();
	}
	goDetail(item) {
		if (!item) {
			return;
		}
		if (item.isWatch) {
			toHref(`watchwallet?id=${item.id}`);
			return;
		}
		if (item.category.id === 1 && !item.isWatch) {
			toHref(`ethwallet?id=${item.id}`);
			return;
		}
		if (item.category.id === 2 && !item.isWatch) {
			toHref(`neowallet?id=${item.id}`);
			return;
		}
	}
	getChildMoney(list, o) {
		let num = 0;
		if (o.category_id == 1) {
			if (list && list.length > 0) {
				list.map((item, index) => {
					let price =
						item.gnt_category && item.gnt_category.cap
							? this.props.lng == "en"
								? item.gnt_category.cap.price_usd
								: item.gnt_category.cap.price_cny
							: 0;
					num = num - 0 + getEthNum(item.balance) * price - 0;
				});
			}
			if (
				this.props.walletConversion &&
				this.props.walletConversion.list &&
				this.props.walletConversion.list.length > 0
			) {
				this.props.walletConversion.list.map((item, index) => {
					if (item.id == o.id) {
						let price =
							item.category && item.category.cap
								? this.props.lng == "en"
									? item.category.cap.price_usd
									: item.category.cap.price_cny
								: 0;
						num = num - 0 + getEthNum(item.balance) * price - 0;
					}
				});
			}
			let res = new Number(num) + 0;
			return typeof res === "number" && !isNaN(res) ? res.toFixed(4) : 0;
		}
		if (o.category_id == 2) {
			if (list && list.length > 0) {
				list.map((item, index) => {
					let price =
						item.gnt_category && item.gnt_category.cap
							? this.props.lng == "en"
								? item.gnt_category.cap.price_usd
								: item.gnt_category.cap.price_cny
							: 0;
					if (item.id === 51) {
						console.log(price);
					}
					num =
						num +
						getNumFromStr(item.balance) /
							Math.pow(10, item.decimals) *
							price -
						0;
				});
			}
			if (
				this.props.walletConversion &&
				this.props.walletConversion.list &&
				this.props.walletConversion.list.length > 0
			) {
				this.props.walletConversion.list.map((item, index) => {
					if (item.id == o.id) {
						let price =
							item.category && item.category.cap
								? this.props.lng == "en"
									? item.category.cap.price_usd
									: item.category.cap.price_cny
								: 0;
						num += item.balance * price;
					}
				});
			}
			let res = new Number(num) + 0;
			return typeof res === "number" && !isNaN(res) ? res.toFixed(4) : 0;
		}
	}
	getCommonList(server, local) {
		if (!(server && local)) {
			return null;
		}
		let l = [];
		server.list.map((item, index) => {
			item.isWatch = true;
			local.map((i, m) => {
				if (
					item.address &&
					i.address &&
					item.address === i.address &&
					item.name === i.name
				) {
					item.isWatch = false;
				}
			});
			l.push(item);
		});
		return l;
	}
	goManger(item, e) {
		e.stopPropagation();
		if (item.isWatch) {
			toHref(
				`watchmanagewallet?id=${item.id}&type=${
					item.category_id
				}&name=${item.name}`
			);
		} else {
			toHref(`managewallet?id=${item.id}`);
		}
	}
	render() {
		let {
			lng,
			walletList,
			walletConversion,
			walletDetail,
			localWalletList
		} = this.props;
		let list = this.getCommonList(walletList, localWalletList);
		//console.log(list);
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
											{list &&
												list.length > 0 &&
												list.map((item, index) => {
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
																onClick={this.goManger.bind(
																	this,
																	item
																)}
																src={
																	item.category &&
																	item
																		.category
																		.img
																}
															/>
															<div className="f1">
																<div className="wallet-name">
																	{item.name}
																	{item.isWatch ? (
																		<span className="watch">
																			watch
																		</span>
																	) : (
																		""
																	)}
																</div>
																<div className="wallet-address">
																	{
																		item.address
																	}
																</div>
															</div>
															<div>
																{item.id &&
																	walletDetail && (
																		<span className="t3">
																			{lng ===
																			"en"
																				? "$"
																				: "￥"}
																			{this.getChildMoney(
																				walletDetail[
																					item
																						.id
																				],
																				item
																			)}
																		</span>
																	)}
															</div>
														</div>
													);
												})}
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
