import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
import Menu from "@/menu";
import ConfirmPass from "@/confirmpassword";
import HeaderNav from "@/headernav";
import "./index.less";
import { toHref } from "../../../../utils/util";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			walletType: "",
			isChange: false,
			name: "",
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
		if (q.timetamp) {
			let text = JSON.parse(sessionStorage.getItem(q.timetamp));
			set.text = text;
		}
		this.setState({
			...set
		});
	}
	textChange(e) {
		this.setState({
			text: e.target.value
		});
	}
	goEnd() {
		if (this.state.text.length <= 0) {
			Msg.prompot(i18n.t("error.privateKeyEmpty", this.props.lng));
			return;
		}
		let time = new Date().getTime();
		sessionStorage.setItem(
			`import_${time}`,
			JSON.stringify(this.state.text)
		);
		toHref(
			"importend",
			`typeid=${this.state.walletType}&value=${
				this.state.text
			}&type=privatekey&timetamp=import_${time}`
		);
	}
	openPass() {
		this.setState({
			isShowPass: true
		});
	}
	closePass() {
		this.setState({
			isShowPass: false
		});
	}
	importHot(res) {
		let params = {};
		params.password = res;
		params.name = this.state.name;
		if (this.state.walletType == 1) {
			params.type = "eth";
		}
		if (this.state.walletType == 2) {
			params.type = "neo";
		}
		if (this.state.walletType == 3) {
			params.type = "btc";
		}
		if (this.state.text.length <= 0) {
			Msg.prompt("the key is empty");
			return;
		}
		params.wif = this.state.text;
		let load = Msg.load(i18n.t("changeing", this.props.lng));
		this.props.importPrivate(params).then(res => {
			load.hide();
			if (res.address && res.address.length > 0) {
				toHref("wallet");
			}
		});
	}
	render() {
		let { lng } = this.props;
		let { text, isChange, isShowPass } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="importprivate">
									<div className="title">
										{t("private.title", lng)}
									</div>
									<div className="private-container ui jcenter">
										<div className="private-box">
											<div>
												<textarea
													className="textarea"
													placeholder={t(
														"private.textarea",
														lng
													)}
													value={text}
													onChange={this.textChange.bind(
														this
													)}
												/>
											</div>
											<div className="private-btn">
												{!isChange && (
													<span
														className="button-green"
														onClick={this.goEnd.bind(
															this
														)}
													>
														{t("private.next", lng)}
													</span>
												)}
												{isChange && (
													<span
														className="button-green"
														onClick={this.openPass.bind(
															this
														)}
													>
														{t(
															"private.changeHot",
															lng
														)}
													</span>
												)}
											</div>
										</div>
									</div>
									{isShowPass && (
										<ConfirmPass
											lng={lng}
											close={this.closePass.bind(this)}
											confirm={this.importHot.bind(this)}
										/>
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
