import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import { getQuery } from "../../../../utils/util";
import ConfirmPassword from "@/confirmpassword";
import HeaderNav from "@/headernav";
import "./index.less";
import { toHref } from "../../../../utils/util";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 0,
			readFileText: null,
			readFileName: "",
			textValue: "",
			walletType: "",
			isChange: false,
			isShowPass: false
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q.wallettype) {
			set.walletType = q.wallettype;
		}
		if (q.isChange) {
			set.isChange = true;
			set.name = q.name;
		}
		this.setState({ ...set });
	}
	checkClick(idx) {
		this.setState({
			type: idx
		});
	}
	textValueChange(e) {
		this.setState({
			textValue: e.target.value
		});
	}
	inputFileChange(e) {
		let file = e.target.files[0];
		if (!file) {
			return;
		}
		let path = file.path;
		this.setState({
			readFileName: path
		});
		fs.readFile(path, "utf8", (err, data) => {
			if (err) {
				Msg.alert("读取文件错误");
				return;
			}
			this.setState({
				readFileText: data
			});
		});
	}
	goNext() {
		let str = null;
		if (this.state.type == 0) {
			str = this.state.textValue;
		}
		if (this.state.type == 1) {
			str = this.state.readFileText;
		}
		let reg = /^\{.*?\}$/;
		if (!reg.test(str)) {
			Msg.prompt(i18n.t("error.keyerror", this.props.lng));
			return;
		}
		toHref(
			"importend",
			`typeid=${this.state.walletType}&type=keystore&value=${str}`
		);
	}
	opPass() {
		let str = null;
		if (this.state.type == 0) {
			str = this.state.textValue;
		}
		if (this.state.type == 1) {
			str = this.state.readFileText;
		}
		let reg = /^\{.*?\}$/;
		if (!reg.test(str)) {
			Msg.prompt("Key store type is error");
			return;
		}
		this.setState({
			isShowPass: true
		});
	}
	closePass() {
		this.setState({
			isShowPass: false
		});
	}
	changeHot(res) {
		let type = null;
		if (this.state.walletType == 1) {
			type = "eth";
		}
		if (this.state.walletType == 2) {
			type = "neo";
		}
		if (this.state.walletType == 3) {
			type = "btc";
		}
		let json = null;
		if (this.state.type == 0) {
			json = this.state.textValue;
		}
		if (this.state.type == 1) {
			json = this.state.readFileText;
		}
		let load = Msg.load(i18n.t("changeing", png));
		this.props
			.changeToHot({
				name: this.state.name,
				type: type,
				json: json,
				password: res
			})
			.then(res => {
				load.hide();
				if (res.address && res.address.length > 0) {
					this.setState({
						isShowPass: false
					});
					toHref("wallet");
				}
			});
	}
	render() {
		let { lng } = this.props;
		let {
			type,
			readFileText,
			readFileName,
			textValue,
			isChange,
			isShowPass
		} = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="importkeystore">
									<div className="keystore-title">
										{t("keyStore.title", lng)}
									</div>
									<div className="keystore-container">
										<div className="keystore-box">
											<div className="keystore-group ui">
												{type == 0 && (
													<i className="icon-check checked" />
												)}
												{type != 0 && (
													<i
														className="icon-check uncheck"
														onClick={this.checkClick.bind(
															this,
															0
														)}
													/>
												)}
												<div className="f1">
													<textarea
														className="keystore-text"
														placeholder={t(
															"keyStore.textarea",
															lng
														)}
														value={textValue}
														onChange={this.textValueChange.bind(
															this
														)}
													/>
												</div>
											</div>
											<div className="keystore-group ui">
												{type == 1 && (
													<i className="icon-check checked" />
												)}
												{type != 1 && (
													<i
														className="icon-check uncheck"
														onClick={this.checkClick.bind(
															this,
															1
														)}
													/>
												)}
												<div className="f1 ui center">
													<div className="f1">
														<input
															type="text"
															disabled="disabled"
															className={
																type == 1
																	? "filename cur"
																	: "filename"
															}
															placeholder={t(
																"keyStore.input",
																lng
															)}
															value={readFileName}
														/>
													</div>
													<div className="file-btn">
														<input
															ref="inputFile"
															type="file"
															onChange={this.inputFileChange.bind(
																this
															)}
														/>
														<i className="icon-openfile" />
													</div>
												</div>
											</div>
											<div className="key-next">
												{!isChange && (
													<span
														className="button-green"
														onClick={this.goNext.bind(
															this
														)}
													>
														{t(
															"keyStore.next",
															lng
														)}
													</span>
												)}
												{isChange && (
													<span
														className="button-green"
														onClick={this.opPass.bind(
															this
														)}
													>
														{t(
															"keyStore.changeHot",
															lng
														)}
													</span>
												)}
											</div>
										</div>
										{isShowPass && (
											<ConfirmPassword
												confirm={this.changeHot.bind(
													this
												)}
												close={this.closePass.bind(
													this
												)}
												lng={lng}
											/>
										)}
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
