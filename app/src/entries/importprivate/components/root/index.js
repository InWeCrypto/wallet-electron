import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";
import { toHref } from "../../../../utils/util";

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
			}&&type=privatekey`
		);
	}
	render() {
		let { lng } = this.props;
		let { text } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
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
												<span
													className="btn"
													onClick={this.goEnd.bind(
														this
													)}
												>
													{t("private.next", lng)}
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
