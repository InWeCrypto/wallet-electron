import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery, toHref } from "../../../../utils/util";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import ConfirmPassword from "@/confirmpassword";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			walletType: "",
			word: "",
			isChange: false,
			isShowPass: false,
			name: ""
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
			set.word = text;
		}
		this.setState({
			...set
		});
	}
	goEnd() {
		if (this.state.word.length <= 0) {
			Msg.prompt(i18n.t("error.memonicEmpty", this.props.lng));
			return;
		}
		let time = new Date().getTime();
		sessionStorage.setItem(
			`import_${time}`,
			JSON.stringify(this.state.word)
		);
		toHref(
			"importend",
			`typeid=${this.state.walletType}&value=${
				this.state.word
			}&type=mnemonic&timetamp=import_${time}`
		);
	}
	textChange(e) {
		this.setState({
			word: e.target.value
		});
	}
	async changeHot(res) {
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
		let mnemonic = this.state.word.trim();
		let load = Msg.load(i18n.t("changeing", this.props.lng));
		try {
			let importres = await this.props.changeToHot({
				name: this.state.name,
				type: type,
				mnemonic: mnemonic,
				password: res,
				lang: this.props.lng == "en" ? "en_US" : "zh_CN"
			});
			load.hide();
			if (importres.address && importres.address.length > 0) {
				this.setState({
					isShowPass: false
				});
				toHref("wallet");
			}
		} catch (e) {
			load.hide();
		}
	}
	openPass() {
		if (this.state.word.length <= 0) {
			Msg.prompt(i18n.t("error.memonicEmpty", this.props.lng));
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
	submitFeed(params) {
		return this.props.submitFeedBack(params);
	}
	render() {
		let { lng } = this.props;
		let { word, isShowPass, isChange } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu
							submitFeed={this.submitFeed.bind(this)}
							curmenu="wallet"
							lng={lng}
						/>
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="importmnemonic">
									<div className="title">
										{t("mnemonic.title", lng)}
									</div>
									<div className="mnemonic-container ui jcenter">
										<div className="mnemonic-box">
											<div>
												<textarea
													className="textarea"
													placeholder={t(
														"mnemonic.textarea",
														lng
													)}
													value={word}
													onChange={this.textChange.bind(
														this
													)}
												/>
											</div>
											{!isChange && (
												<div className="mnemonic-btn">
													<span
														className="button-green"
														onClick={this.goEnd.bind(
															this
														)}
													>
														{t(
															"mnemonic.next",
															lng
														)}
													</span>
												</div>
											)}
											{isChange && (
												<div className="mnemonic-btn">
													<span
														className="button-green"
														onClick={this.openPass.bind(
															this
														)}
													>
														{t(
															"mnemonic.changeHot",
															lng
														)}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						{isShowPass && (
							<ConfirmPassword
								confirm={this.changeHot.bind(this)}
								close={this.closePass.bind(this)}
								lng={lng}
							/>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
