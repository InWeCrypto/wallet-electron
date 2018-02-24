import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
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
												/>
											</div>
											<div className="watch-btn">
												<span className="btn">
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
