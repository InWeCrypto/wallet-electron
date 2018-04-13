import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import icon1 from "#/mnemonic_ico.png";
import icon2 from "#/key.png";
import icon3 from "#/delet.png";
import searchimg from "#/search_ico.png";
import { getQuery } from "../../../../utils/util";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			isShowMemo: true
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q.id) {
			set.id = q.id;
		}
		if (q.address) {
			set.address = q.address;
			let l = localStorage.getItem("memoList");
			if (
				!(!l || l.length < 0 || JSON.parse(l).indexOf(q.address) == -1)
			) {
				set.isShowMemo = false;
			}
		}
		if (q.name) {
			set.name = q.name;
		}
		this.setState({
			...set
		});
		ipc.on("deleteLocalWallet", () => {
			this.deleteWallet(true);
		});
	}

	showInputBox() {
		this.setState({
			isShowInputBox: true
		});
	}
	hideInputBox(e) {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			isShowInputBox: false
		});
	}
	surePassword() {
		let { password, address, name } = this.state;
		if (!password || password.length < 6) {
			Msg.prompt(i18n.t("error.passLength", this.props.lng));
			return;
		}
		this.props
			.vailPass({
				address: address,
				pass: password,
				lang: this.props.lng == "en" ? "en_US" : "zh_CN"
			})
			.then(res => {
				if (res.length > 0) {
					toHref(
						"mnemonic",
						`address=${address}&name=${
							this.state.name
						}&pass=${password}`
					);
				}
			});
	}
	passwordChange(e) {
		this.setState({
			password: e.target.value
		});
	}
	toKeystroe() {
		toHref(
			"keystore",
			`address=${this.state.address}&name=${this.state.name}`
		);
	}
	deleteWallet(type) {
		let { address, name, id, password } = this.state;
		if (!type) {
			ipc.send(
				"question",
				i18n.t("deletetip.title", this.props.lng),
				i18n.t("deletetip.txt", this.props.lng)
			);
		} else {
			this.props
				.deleteLocal({
					address: address
				})
				.then(res => {
					if (res == null) {
						this.props
							.deleteSever({
								id: id
							})
							.then(res1 => {
								if (res1.code === 4000) {
									toHref("wallet");
								}
							});
					}
				});
		}
	}
	render() {
		let { lng } = this.props;
		let { isShowInputBox, password, isShowMemo } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box managewallet">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content managewallet-content">
								<div className="title">
									{t("managerWallet.title", lng)}
								</div>
								<div className="title2">
									{t("managerWallet.h2", lng)}
								</div>
								<div className="hotarea-box">
									{isShowMemo && (
										<div
											className="hotarea memo"
											onClick={this.showInputBox.bind(
												this
											)}
										>
											<div className="icon-box memoico" />
											<div className="name">
												{t(
													"managerWallet.mnemonic",
													lng
												)}
											</div>
											{/* {isShowInputBox && ( */}
											<div
												className={
													isShowInputBox
														? "hideBox show"
														: "hideBox"
												}
											>
												<input
													placeholder={t(
														"managerWallet.place",
														lng
													)}
													type="password"
													value={password}
													onChange={this.passwordChange.bind(
														this
													)}
													className={(password => {
														return password.length >
															0
															? "has"
															: "";
													})(password)}
												/>
												<div className="btnBox">
													<button
														className="cancel button-black"
														onClick={this.hideInputBox.bind(
															this
														)}
													>
														{t(
															"managerWallet.cancel",
															lng
														)}
													</button>
													<button
														className="comfirm button-green"
														onClick={this.surePassword.bind(
															this
														)}
													>
														{t(
															"managerWallet.comfirm",
															lng
														)}
													</button>
												</div>
											</div>
											// )}
										</div>
									)}

									<div
										className="hotarea"
										onClick={this.toKeystroe.bind(this)}
									>
										<div className="icon-box keyico" />
										<div className="name">
											{t("managerWallet.keystore", lng)}
										</div>
									</div>
									<div
										className="hotarea"
										onClick={() => {
											this.deleteWallet();
										}}
									>
										<div className="icon-box deleteico" />
										<div className="name">
											{t("managerWallet.delete", lng)}
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
