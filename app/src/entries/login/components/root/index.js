import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import "./index.less";
import loginHeader from "#/tou_pic.png";
<<<<<<< HEAD

=======
import loginName from "#/loginname.png";
>>>>>>> ccbc368d6b7f408637ff6ed620cf619ee6f7448a
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
							<div className="login-header">
								<img className="login-img" src={loginHeader} />
							</div>
							<div className="login-name">
								<img className="loginname" src={loginName} />
							</div>
							<div className="login-btn">
								<span className="loginbtn">
									{t("login.login", lng)}
								</span>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
