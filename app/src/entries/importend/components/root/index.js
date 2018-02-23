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
					<div className="importend">
						<div className="title">{t("end.title", lng)}</div>
						<div className="end-container ui jcenter">
							<div className="end-box">
								<div className="end-item">
									<input
										className="input"
										type="text"
										placeholder={t("end.name", lng)}
									/>
								</div>
								<div className="end-item">
									<input
										className="input"
										type="text"
										placeholder={t("end.password", lng)}
									/>
								</div>
								<div className="endbtn">
									<span className="btn">
										{t("end.previous", lng)}
									</span>
									<span className="btn">
										{t("end.comfirm", lng)}
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
