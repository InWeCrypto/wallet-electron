import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			phoneNum: "",
			code: "",
			open: false,
			checkDev: true
		};
	}
	componentDidMount() {
		console.log(i18n.t("login.login", this.props.lng));
	}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="login ui">
						<div className="login-content">
							{t("login.login", lng)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
