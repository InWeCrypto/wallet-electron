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
					<div className="importprivate">
						<div className="title">{t("private.title", lng)}</div>
						<div className="private-container ui jcenter">
							<div className="private-box">
								<div>
									<textarea
										className="textarea"
										placeholder={t("private.textarea", lng)}
									/>
								</div>
								<div className="private-btn">
									<span className="btn">
										{t("private.next", lng)}
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
