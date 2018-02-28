import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { I18n } from "react-i18next";
import SendBtn from "../../../../components/sendbtn";
import "./index.less";
import loginName from "#/loginname.png";
import loginHeader from "#/tou_pic.png";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: "signin",
			email: "",
			password: "",
			registerEmail: "",
			registerCode: "",
			registerPassword: "",
			registerRepassword: "",
			forgetEmail: "",
			forgetCode: "",
			forgetPassword: "",
			forgetRepassword: "",
			registerTime: 60
		};
	}
	componentDidMount() {}
	goFroget() {
		this.setState({
			type: "forget"
		});
	}
	goSignIn() {
		this.setState({
			type: "signin"
		});
	}
	goRegister() {
		this.setState({
			type: "register"
		});
	}
	inputChange(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	sendRegisterCode() {
		this.props.sendEmailCode(this.state.registerEmail);
	}
	sendForgetCode() {
		this.props.sendEmailCode(this.state.forgetEmail);
	}
	render() {
		let { lng } = this.props;
		let {
			type,
			email,
			password,
			registerEmail,
			registerCode,
			registerPassword,
			registerRepassword,
			forgetEmail,
			forgetCode,
			forgetPassword,
			forgetRepassword
		} = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="login">
						<div className="login-content">
							{type == "signin" && (
								<div>
									<div className="login-header">
										<img
											className="login-img"
											src={loginHeader}
										/>
									</div>
									<div className="login-name">
										<img
											className="loginname"
											src={loginName}
										/>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="text"
												placeholder={t(
													"login.email",
													lng
												)}
												value={email}
												onChange={this.inputChange.bind(
													this,
													"email"
												)}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="password"
												placeholder={t(
													"login.password",
													lng
												)}
												value={password}
												onChange={this.inputChange.bind(
													this,
													"password"
												)}
											/>
										</div>
									</div>
									<div className="login-forget">
										<span
											className="t1"
											onClick={this.goFroget.bind(this)}
										>
											{t("login.forget", lng)}
										</span>
									</div>
									<div className="login-btn">
										<span className="loginbtn">
											{t("login.signin", lng)}
										</span>
										<div className="signup">
											<span
												onClick={this.goRegister.bind(
													this
												)}
											>
												{t("login.signup", lng)}
											</span>
										</div>
									</div>
								</div>
							)}
							{type == "register" && (
								<div className="register">
									<i
										className="icon-return"
										onClick={this.goSignIn.bind(this)}
									/>
									<div className="login-name">
										<img
											className="loginname"
											src={loginName}
										/>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="text"
												placeholder={t(
													"login.email",
													lng
												)}
												value={registerEmail}
												onChange={this.inputChange.bind(
													this,
													"registerEmail"
												)}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="text"
												placeholder={t(
													"login.code",
													lng
												)}
												value={registerCode}
												onChange={this.inputChange.bind(
													this,
													"registerCode"
												)}
											/>
											<SendBtn
												className="send"
												onClick={this.sendRegisterCode.bind(
													this
												)}
												lng={lng}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="password"
												placeholder={t(
													"login.password",
													lng
												)}
												value={registerPassword}
												onChange={this.inputChange.bind(
													this,
													"registerPassword"
												)}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="password"
												placeholder={t(
													"login.repassword",
													lng
												)}
												value={registerRepassword}
												onChange={this.inputChange.bind(
													this,
													"registerRepassword"
												)}
											/>
										</div>
									</div>
									<div className="login-btn">
										<span className="loginbtn">
											{t("login.signup", lng)}
										</span>
									</div>
								</div>
							)}
							{type == "forget" && (
								<div className="forget">
									<i
										className="icon-return"
										onClick={this.goSignIn.bind(this)}
									/>
									<div className="login-name">
										<img
											className="loginname"
											src={loginName}
										/>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="text"
												placeholder={t(
													"login.email",
													lng
												)}
												value={forgetEmail}
												onChange={this.inputChange.bind(
													this,
													"forgetEmail"
												)}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="text"
												placeholder={t(
													"login.code",
													lng
												)}
												value={forgetCode}
												onChange={this.inputChange.bind(
													this,
													"forgetCode"
												)}
											/>
											<SendBtn
												className="send"
												onClick={this.sendForgetCode.bind(
													this
												)}
												lng={lng}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="password"
												placeholder={t(
													"login.password",
													lng
												)}
												value={forgetPassword}
												onChange={this.inputChange.bind(
													this,
													"forgetPassword"
												)}
											/>
										</div>
									</div>
									<div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="password"
												placeholder={t(
													"login.repassword",
													lng
												)}
												value={forgetRepassword}
												onChange={this.inputChange.bind(
													this,
													"forgetRepassword"
												)}
											/>
										</div>
									</div>
									<div className="login-btn">
										<span className="loginbtn">
											{t("login.reset", lng)}
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
