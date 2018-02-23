import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
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
					<div className="importkeystore">
						<div className="keystore-title">
							{t("keyStore.title", lng)}
						</div>
						<div className="keystore-container">
							<div className="keystore-box">
								<div className="keystore-group ui">
									<i className="icon-check uncheck" />
									<div className="f1">
										<textarea
											className="keystore-text"
											placeholder={t(
												"keyStore.textarea",
												lng
											)}
										/>
									</div>
								</div>
								<div className="keystore-group ui">
									<i className="icon-check uncheck" />
									<div className="f1 ui center">
										<div className="f1">
											<input
												type="text"
												disabled="disabled"
												className="filename"
												placeholder={t(
													"keyStore.input",
													lng
												)}
											/>
										</div>
										<i className="icon-openfile" />
									</div>
								</div>
								<div className="key-next">
									<span className="keybtn">
										{t("keyStore.next", lng)}
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
