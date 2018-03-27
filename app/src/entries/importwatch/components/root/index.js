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
		if (q.wallettype) {
			this.setState({
				walletType: q.wallettype
			});
		}
	}
	textChange(e) {
		this.setState({
			text: e.target.value
		});
	}
	goEnd() {
		toHref(
			"importend",
			`typeid=${this.state.walletType}&value=${
				this.state.text
			}&type=watch`
		);
	}
	render() {
		let { lng } = this.props;
		let { text } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
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
													className="btn"
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
