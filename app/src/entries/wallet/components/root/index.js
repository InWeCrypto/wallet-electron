import React, { PureComponent } from "react";
import { BigNumber } from "bignumber.js";
import { Link } from "react-router-dom";
import { I18n } from "react-i18next";
import PerfectScrollbar from "perfect-scrollbar";
import { getQuery, getShowMoney, getNeoNumber } from "../../../../utils/util";
import Menu from "@/menu";
import "./index.less";
import ledger from "#/ledger_ico.png";
import ledger1 from "#/ledger_ico1.png";
import ethicon from "#/ethicon.png";
import neoicon from "#/neoicon.png";
import { toHref } from "../../../../utils/util";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.myScroll = null;
	}
	async componentDidMount() {
		let res = await this.props.getWalletList();
		if (res.code === 4000) {
			let list = [];
			res.data.list.map((item, index) => {
				list.push(item.id);
			});
			let res1 = await this.props.getWalletConversion({
				ids: `[${list.join(",")}]`
			});
			if (res1.code === 4000) {
				let dlist = [];
				res1.data.list.map((item, index) => {
					this.props.getWalletDetail({
						id: item.id
					});
				});
			}
		}
		let local = await this.props.getLocalList();
		localStorage.setItem("localWallet", JSON.stringify(local));
		this.myScroll = new PerfectScrollbar("#listbox");
	}
	componentWillUnmount() {
		if (this.myScroll) {
			this.myScroll.destroy();
		}
		this.myScroll = null;
	}
	goDetail(item) {
		if (!item) {
			return;
		}
		if (item.isWatch) {
			toHref(`watchwallet?id=${item.id}&type=${item.category_id}`);
			return;
		}
		if (item.category.id === 1 && !item.isWatch) {
			toHref(
				`ethwallet?id=${item.id}&type=${
					item.category_id
				}&localaddress=${item.localAddress}`
			);
			return;
		}
		if (item.category.id === 2 && !item.isWatch) {
			toHref(`neowallet?id=${item.id}&type=${item.category_id}`);
			return;
		}
	}
	getChildMoney(list, o) {
		let { lng } = this.props;
		let num = new BigNumber(0);
		if (o.category_id == 1) {
			if (list && list.list && list.list.length > 0) {
				list.list.map((item, index) => {
					let price =
						item.gnt_category && item.gnt_category.cap
							? lng == "en"
								? item.gnt_category.cap.price_usd
								: item.gnt_category.cap.price_cny
							: 0;
					num = num.plus(
						new BigNumber(
							getShowMoney(
								getEthNum(item.balance, item.decimals),
								price
							)
						)
					);
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
								? lng == "en"
									? item.category.cap.price_usd
									: item.category.cap.price_cny
								: 0;
						num = num.plus(
							new BigNumber(
								getShowMoney(
									getEthNum(item.balance, item.decimals),
									price
								)
							)
						);
					}
				});
			}
			let r = getNumberString(num) + "";
			return r.substring(0, r.lastIndexOf(".") + 3);
		}
		if (o.category_id == 2) {
			if (list && list.list && list.list.length > 0) {
				list.list.map((item, index) => {
					let price =
						item.gnt_category && item.gnt_category.cap
							? lng == "en"
								? item.gnt_category.cap.price_usd
								: item.gnt_category.cap.price_cny
							: 0;
					num = num.plus(
						new BigNumber(
							getShowMoney(
								getNumFromStr(item.balance, item.decimals),
								price
							)
						)
					);
				});
			}

			if (
				list &&
				list.record &&
				list.record.gnt &&
				list.record.gnt.length > 0
			) {
				list.record.gnt.map((item, index) => {
					num = num.plus(
						new BigNumber(
							getShowMoney(
								getNeoNumber(item.balance),
								item.cap
									? lng == "en"
										? item.cap.price_usd
										: item.cap.price_cny
									: 0
							)
						)
					);
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
								? lng == "en"
									? item.category.cap.price_usd
									: item.category.cap.price_cny
								: 0;
						num = num.plus(
							new BigNumber(
								getShowMoney(getNeoNumber(item.balance), price)
							)
						);
					}
				});
			}
			let res = new Number(num) + 0;
			return typeof res === "number" && !isNaN(res) ? res.toFixed(2) : 0;
		}
	}
	getCommonList(server, local) {
		if (!(server && local)) {
			return null;
		}
		let backUp = localStorage.getItem("backUp");
		let l = [];
		server.list.map((item, index) => {
			item.isWatch = true;
			item.isBackup = false;
			if (local && local.length > 0) {
				local.map((i, m) => {
					if (
						item.address &&
						i.address &&
						item.address.toLowerCase() ===
							i.address.toLowerCase() &&
						item.name === i.name
					) {
						item.isWatch = false;
						item.localAddress = i.address;
					}
				});
			}
			if (backUp && JSON.parse(backUp).length > 0) {
				JSON.parse(backUp).map((i, m) => {
					if (item.category_id == 1) {
						if (
							item.address &&
							i.toLowerCase() === item.address.toLowerCase()
						) {
							item.isBackup = true;
						}
					} else if (item.address && i === item.address) {
						item.isBackup = true;
					}
				});
			}

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
			toHref(
				`managewallet?id=${item.id}&address=${item.localAddress}&name=${
					item.name
				}`
			);
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
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
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
											<span className="walletimg create" />
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
											<span className="walletimg import" />
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
										<div
											className="group-main"
											id="listbox"
										>
											{list &&
												list.length > 0 &&
												list.map((item, index) => {
													return (
														<div
															className={
																index % 2 != 0
																	? "group-out"
																	: "group-out even"
															}
															key={index}
														>
															<div
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
																			.id ==
																			1
																			? ethicon
																			: neoicon
																	}
																/>
																<div className="f1">
																	<div className="wallet-name">
																		{
																			item.name
																		}
																		{item.isWatch ? (
																			<span className="watch">
																				{t(
																					"watch.watch",
																					lng
																				)}
																			</span>
																		) : (
																			""
																		)}
																		{!item.isWatch &&
																			!item.isBackup && (
																				<span className="unback">
																					{t(
																						"unbackup",
																						lng
																					)}
																				</span>
																			)}
																	</div>
																	<div className="wallet-address">
																		{item.category_id ==
																		2
																			? item.address
																			: item.address.toLowerCase()}
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
																				{Number(
																					this.getChildMoney(
																						walletDetail[
																							item
																								.id
																						],
																						item
																					)
																				)}
																			</span>
																		)}
																</div>
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
