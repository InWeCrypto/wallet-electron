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
			walletType: "",
			word: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.wallettype) {
			this.setState({
				walletType: q.wallettype
			});
		}
	}
	goEnd() {
		toHref(
			"importend",
			`typeid=${this.state.walletType}&value=${
				this.state.word
			}&type=mnemonic`
		);
	}
	textChange(e) {
		this.setState({
			word: e.target.value
		});
	}
	render() {
		let { lng } = this.props;
		let { word } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
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
											<div className="mnemonic-btn">
												<span
													className="btn"
													onClick={this.goEnd.bind(
														this
													)}
												>
													{t("mnemonic.next", lng)}
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
