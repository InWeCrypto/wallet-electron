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
			password: ""
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
		}
		if (q.name) {
			set.name = q.name;
		}
		this.setState({
			...set
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
	deleteWallet() {
		let { address, name, id, password } = this.state;
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
	render() {
		let { lng } = this.props;
		let { isShowInputBox, password } = this.state;

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
									<div
										className="hotarea inMnemonic"
										onClick={this.showInputBox.bind(this)}
									>
										<div className="imgbox">
											<img className="img" src={icon1} />
										</div>
										<div className="name">
											{t("managerWallet.mnemonic", lng)}
										</div>
										{isShowInputBox && (
											<div className="hideBox">
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
												/>
												<div className="btnBox">
													<button
														className="cancel"
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
														className="comfirm"
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
										)}
									</div>
									<div
										className="hotarea"
										onClick={this.toKeystroe.bind(this)}
									>
										<div className="imgbox">
											<img
												className="img"
												src={icon2}
												alt=""
											/>
										</div>
										<div className="name">
											{t("managerWallet.keystore", lng)}
										</div>
									</div>
									<div
										className="hotarea"
										onClick={this.deleteWallet.bind(this)}
									>
										<div className="imgbox">
											<img className="img" src={icon3} />
										</div>
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
