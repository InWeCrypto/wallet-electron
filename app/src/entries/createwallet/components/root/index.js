import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			itemList: []
		};
		this.groupClose = this.groupClose.bind(this);
	}
	componentDidMount() {
		document.addEventListener("click", this.groupClose, false);
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
			this.props.map(() => {
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
		document.removeEventListener("click", this.groupClose, false);
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
		let { walletTypes } = this.props;
		let { itemList } = this.state;
		let param = {
			category_id: walletTypes[idx].id,
			name: itemList[idx].walletName,
			address: "AH3V6KHbJoe5jRDwuxXtBPRiyLKYwEau8o"
		};
		//eth:0x21cD879e7b7fE6de1225B431E782C40b72441Be0
		//neo:AH3V6KHbJoe5jRDwuxXtBPRiyLKYwEau8o
		this.props.createWallet(param).then(res => {
			if (res.code === 4000) {
				Msg.prompt("success");
			}
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
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content">
								<div className="createwallet" id="createWallet">
									<div className="create-title">
										{t("createWallet.title", lng)}
									</div>
									<div className="create-container">
										{walletTypes &&
											walletTypes.length > 0 &&
											walletTypes.map((item, index) => {
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
																<img
																	className="wallet-img"
																	src={
																		item.img
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
																			item.img
																		}
																	/>
																</div>
																<div className="create-detail">
																	<div className="detail-item">
																		{itemList[
																			index
																		] && (
																			<input
																				className="input"
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
																				className="input"
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
																				className="input"
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
																			className="detail-btn"
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
																			className="detail-btn c"
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
