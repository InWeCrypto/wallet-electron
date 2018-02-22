import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import "./index.less";
import loginHeader from "../../../../assets/images/login.png";
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
					<div className="login">
						<div className="login-content">
							<div className="login-header" />
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
