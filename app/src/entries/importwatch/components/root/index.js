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
			text: "",
			walletType: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q.wallettype) {
			set.walletType = q.wallettype;
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
			Msg.prompt(i18n.t("error.addressEmpty", this.props.lng));
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
			}&type=watch&timetamp=import_${time}`
		);
	}
	submitFeed(params) {
		return this.props.submitFeedBack(params);
	}
	render() {
		let { lng } = this.props;
		let { text } = this.state;
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
								<div className="importwatch">
									<div className="title">
										{t("watch.title", lng)}
									</div>
									<div className="watch-container ui jcenter">
										<div className="watch-box">
											<div>
												<textarea
													className="textarea"
													placeholder={t(
														"watch.textarea",
														lng
													)}
													value={text}
													onChange={this.textChange.bind(
														this
													)}
												/>
											</div>
											<div className="watch-btn">
												<span
													className="button-green"
													onClick={this.goEnd.bind(
														this
													)}
												>
													{t("watch.next", lng)}
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
