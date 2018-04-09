import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import http from "../../../../utils/ajax";
import ethicon from "#/ethicon.png";
import neoicon from "#/neoicon.png";
import "./index.less";
import { toHref } from "../../../../utils/util";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			itemList: []
		};
		this.groupClose = this.groupClose.bind(this);
		this.createClick = this.createClick.bind(this);
	}
	componentDidMount() {
		document.addEventListener("click", this.groupClose, false);
		document.addEventListener("keypress", this.createClick, false);
		if (!this.props.walletTypes) {
			this.props.getWalletType().then(res => {
				if (res.code === 4000) {
					let arr = [];
					res.data.map(() => {
						arr.push({
							isShow: false,
							walletName: "",
							password: "",
							repeatPassword: ""
						});
					});
					this.setState({
						itemList: arr
					});
				}
			});
		} else {
			let arr = [];
			this.props.walletTypes.map(() => {
				arr.push({
					isShow: false,
					walletName: "",
					password: "",
					repeatPassword: ""
				});
			});
			this.setState({
				itemList: arr
			});
		}
	}
	componentWillUnmount() {
		document.removeEventListener("click", this.groupClose);
		document.removeEventListener("keypress", this.createClick);
	}
	createClick(e) {
		let idx = null;
		this.state.itemList.map((item, index) => {
			if (item.isShow) {
				idx = index;
			}
		});
		if (e.keyCode == 13 && idx != null) {
			this.createWalletClick(idx);
		}
	}
	groupClose() {
		let list = this.state.itemList.map(item => {
			item.isShow = false;
			return item;
		});
		this.setState({
			isShow: [...list]
		});
	}
	openFaceClick(idx, e) {
		let list = this.state.itemList.map((item, index) => {
			if (idx === index) {
				item.isShow = true;
			} else {
				item.isShow = false;
			}
			return item;
		});
		this.setState({
			itemList: [...list]
		});
		e.nativeEvent.stopImmediatePropagation();
	}
	closeClick(e) {
		let list = this.state.itemList.map((item, index) => {
			item.isShow = false;
			return item;
		});
		this.setState({
			itemList: [...list]
		});
		e.nativeEvent.stopImmediatePropagation();
	}
	inputChange(idx, type, e) {
		let list = this.state.itemList;
		list[idx][type] = e.target.value;
		this.setState({
			itemList: [...list]
		});
	}
	createWalletClick(idx) {
		let { walletTypes, lng } = this.props;
		let { itemList } = this.state;
		let name = itemList[idx].walletName;
		let type = walletTypes[idx].name.toLowerCase();
		let password = itemList[idx].password;
		let repassword = itemList[idx].repeatPassword;
		if (!name || name.length <= 0) {
			Msg.prompt(i18n.t("error.nameEmpty", lng));
			return;
		}
		if (!password || password.length <= 0) {
			Msg.prompt(i18n.t("error.nameEmpty", lng));
			return;
		}
		let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/g;

		if (!reg.test(password)) {
			Msg.prompt(i18n.t("error.passVili", lng));
			return;
		}
		if (password != repassword) {
			Msg.prompt(i18n.t("error.passLength", lng));
			return;
		}
		let params = {
			name: itemList[idx].walletName,
			type: walletTypes[idx].name.toLowerCase(),
			password: itemList[idx].password
		};
		this.props.getCreateAddress(params).then(res => {
			this.props
				.createWallet({
					category_id: walletTypes[idx].id,
					name: itemList[idx].walletName,
					address: res.address
				})
				.then(res1 => {
					if (res1.code === 4000) {
						Msg.prompt(i18n.t("createWallet.success", lng));
						setTimeout(() => {
							toHref("wallet");
						}, 2000);
					}
				});
		});
	}
	render() {
		let { lng, createWalletR, walletTypes } = this.props;
		let { itemList } = this.state;
		// console.log(walletTypes);
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="createwallet" id="createWallet">
									<div className="create-title">
										{t("createWallet.title", lng)}
									</div>
									<div className="create-container">
										{walletTypes &&
											walletTypes.length > 0 &&
											walletTypes.map((item, index) => {
												if (index == 2) {
													return null;
												}
												return (
													<div
														key={index}
														className={
															itemList[index] &&
															itemList[index]
																.isShow
																? "create-group showback"
																: "create-group"
														}
													>
														<div className="create-box">
															<div
																className="create-face"
																onClick={this.openFaceClick.bind(
																	this,
																	index
																)}
															>
																{/* <img
																	className="wallet-img"
																	src={
																		item.id ==
																		1
																			? ethicon
																			: neoicon
																	}
																/> */}
																<span
																	className={
																		item.id ==
																		1
																			? "wallet-img eth"
																			: "wallet-img neo"
																	}
																/>
																<div className="t1">
																	{item.name}
																</div>
															</div>
															<div
																className="create-back"
																onClick={e => {
																	e.nativeEvent.stopImmediatePropagation();
																}}
															>
																<div className="back-img">
																	<img
																		className="wallet-img1"
																		src={
																			item.id ==
																			1
																				? ethicon
																				: neoicon
																		}
																	/>
																</div>
																<div className="create-detail">
																	<div className="detail-item">
																		{itemList[
																			index
																		] && (
																			<input
																				className={((
																					itemList,
																					index
																				) => {
																					return itemList[
																						index
																					]
																						.walletName
																						.length >
																						0
																						? "input has"
																						: "input";
																				})(
																					itemList,
																					index
																				)}
																				type="text"
																				placeholder={t(
																					"createWallet.walletName",
																					lng
																				)}
																				value={
																					itemList[
																						index
																					]
																						.walletName
																				}
																				onChange={this.inputChange.bind(
																					this,
																					index,
																					"walletName"
																				)}
																			/>
																		)}
																	</div>
																	<div className="detail-item">
																		{itemList[
																			index
																		] && (
																			<input
																				className={((
																					itemList,
																					index
																				) => {
																					return itemList[
																						index
																					]
																						.password
																						.length >
																						0
																						? "input has"
																						: "input";
																				})(
																					itemList,
																					index
																				)}
																				type="password"
																				placeholder={t(
																					"createWallet.password",
																					lng
																				)}
																				onChange={this.inputChange.bind(
																					this,
																					index,
																					"password"
																				)}
																			/>
																		)}
																	</div>
																	<div className="detail-item">
																		{itemList[
																			index
																		] && (
																			<input
																				className={((
																					itemList,
																					index
																				) => {
																					return itemList[
																						index
																					]
																						.repeatPassword
																						.length >
																						0
																						? "input has"
																						: "input";
																				})(
																					itemList,
																					index
																				)}
																				type="password"
																				placeholder={t(
																					"createWallet.repeatPassword",
																					lng
																				)}
																				onChange={this.inputChange.bind(
																					this,
																					index,
																					"repeatPassword"
																				)}
																			/>
																		)}
																	</div>
																	<div className="detail-ctrl">
																		<span
																			onClick={this.closeClick.bind(
																				this
																			)}
																			className="detail-btn button-black"
																		>
																			{t(
																				"createWallet.cancel",
																				lng
																			)}
																		</span>
																		<span
																			onClick={this.createWalletClick.bind(
																				this,
																				index
																			)}
																			className="detail-btn button-green"
																		>
																			{t(
																				"createWallet.create",
																				lng
																			)}
																		</span>
																	</div>
																</div>
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
				)}
			</I18n>
		);
	}
}
