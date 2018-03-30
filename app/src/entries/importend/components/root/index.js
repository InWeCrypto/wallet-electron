import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery, toHref } from "../../../../utils/util";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			keystore: "",
			type: "",
			name: "",
			password: "",
			importType: "",
			category_id: "",
			mnemonic: "",
			privatekey: "",
			watchAddress: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q.typeid) {
			set.category_id = q.typeid;
		}
		if (q.timetamp) {
			set.timetamp = q.timetamp;
		}
		if (q.typeid == 1) {
			set.type = "eth";
		}
		if (q.typeid == 2) {
			set.type = "neo";
		}
		if (q.type) {
			set.importType = q.type;
		}
		if (q.type == "keystore") {
			set.keystore = q.value;
		}
		if (q.type == "mnemonic") {
			set.mnemonic = q.value.trim();
		}
		if (q.type == "privatekey") {
			set.privatekey = q.value.trim();
		}
		if (q.type == "watch") {
			set.watchAddress = q.value.trim();
		}

		this.setState({
			...set
		});
	}
	inputChange(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	goBack() {
		this.props.history.go(-1);
		let time = this.state.timetamp;
		setTimeout(() => {
			this.props.history.replace({
				pathname: this.props.history.location.pathname + "back",
				search: `${this.props.history.location.search}&timetamp=${time}`
			});
		}, 5);
		setTimeout(() => {
			let his = this.props.history;
			this.props.history.replace({
				pathname: his.location.pathname.replace("back", ""),
				search: `${his.location.search}`
			});
		}, 10);
	}
	async saveClick() {
		let params = {};
		let { lng } = this.props;
		params.name = this.state.name;
		params.type = this.state.type;
		params.password = this.state.password;
		let ism = false;
		if (params.name.length <= 0) {
			Msg.prompt(i18n.t("error.nameEmpty", lng));
			return;
		}
		if (this.state.importType === "keystore") {
			params.json = this.state.keystore;
		}
		if (this.state.importType === "mnemonic") {
			params.mnemonic = this.state.mnemonic;
			params.lang = lng == "en" ? "en_US" : "zh_CN";
		}
		if (this.state.importType === "privatekey") {
			params.wif = this.state.privatekey;
		}

		if (this.state.importType === "watch") {
			let wp = {
				category_id: this.state.category_id,
				name: this.state.name,
				address: this.state.watchAddress
			};
			if (this.state.type == "neo") {
				let whash = await this.props.decodeNep5({
					address: this.state.watchAddress
				});
				if (whash && whash.length > 0) {
					wp.address_hash160 = whash;
				} else {
					Msg.prompt(i18n.t("error.hash160", lng));
					return;
				}
			}
			this.props.createServerWallet(wp).then(res => {
				if (res.code === 4000) {
					toHref("wallet");
				}
			});
			return;
		}
		let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
		if (!reg.test(params.password)) {
			Msg.prompt(i18n.t("error.passError", lng));
			return;
		}
		let local = await this.props.importWallet(params, ism);
		if (local && local.address) {
			let p = {
				category_id: this.state.category_id,
				name: this.state.name,
				address: local.address
			};
			if (this.state.type == "neo") {
				let hash = await this.props.decodeNep5({
					address: local.address
				});
				if (hash && hash.length > 0) {
					p.address_hash160 = hash;
				} else {
					Msg.prompt(i18n.t("error.hash160", lng));
					return;
				}
			}
			this.props.createServerWallet(p).then(res => {
				if (res.code === 4000) {
					toHref("wallet");
				}
			});
		}
	}
	render() {
		let { lng } = this.props;
		let { name, password, importType } = this.state;
		console.log(importType);
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="importend">
									<div className="title">
										{t("end.title", lng)}
									</div>
									<div className="end-container ui jcenter">
										<div className="end-box">
											<div className="end-item">
												<input
													className="input"
													type="text"
													placeholder={t(
														"end.name",
														lng
													)}
													value={name}
													onChange={this.inputChange.bind(
														this,
														"name"
													)}
												/>
											</div>
											{importType != "watch" && (
												<div className="end-item">
													<input
														className="input"
														type="password"
														placeholder={t(
															"end.password",
															lng
														)}
														value={password}
														onChange={this.inputChange.bind(
															this,
															"password"
														)}
													/>
												</div>
											)}

											<div className="endbtn">
												<span
													className="btn"
													onClick={this.goBack.bind(
														this
													)}
												>
													{t("end.previous", lng)}
												</span>
												<span
													className="btn"
													onClick={this.saveClick.bind(
														this
													)}
												>
													{t("end.comfirm", lng)}
												</span>
											</div>
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
