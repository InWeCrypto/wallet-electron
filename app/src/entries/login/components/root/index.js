import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { I18n } from "react-i18next";
import { setLocalItem, toHref } from "../../../../utils/util";
import SendBtn from "../../../../components/sendbtn";
import "./index.less";
import loginName from "#/loginname.png";
import loginName1 from "#/loginname1.png";
import loginHeader from "#/tou_pic.png";
import { timingSafeEqual } from "crypto";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: "signin",
			email: "",
			password: "",
			registerEmail: "",
			registerCode: "",
			registerNickname: "",
			registerPassword: "",
			registerRepassword: "",
			forgetEmail: "",
			forgetCode: "",
			forgetPassword: "",
			forgetRepassword: "",
			registerTime: 60
		};
		this.pressLogin = this.pressLogin.bind(this);
	}
	componentDidMount() {
		document.addEventListener("keypress", this.pressLogin);
		setTimeout(() => {
			document.querySelector("#loginImg").className = "login-img s";
		}, 1000);
	}
	componentWillUnmount() {
		document.removeEventListener("keypress", this.pressLogin);
	}
	pressLogin(e) {
		if (e.keyCode == 13 && this.state.type == "signin") {
			this.signInClick();
		}
	}
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
	sendRegisterCode(callback) {
		if (this.state.registerEmail.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		var type = 1;

		this.props.sendEmailCode(this.state.registerEmail, type).then(res => {
			if (res.code === 4000 && typeof callback === "function") {
				callback();
			}
		});
	}
	sendForgetCode(callback) {
		if (this.state.forgetEmail.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		var type = 2;
		this.props.sendEmailCode(this.state.forgetEmail, type).then(res => {
			if (res.code === 4000 && typeof callback === "function") {
				callback();
			}
		});
	}
	signInClick() {
		if (this.state.email.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		if (this.state.password.length <= 0) {
			Msg.prompt(i18n.t("error.passwordEmpty", this.props.lng));
			return;
		}
		let loading = Msg.load(i18n.t("login.loading", this.props.lng));
		this.props
			.signIn({
				email: this.state.email,
				password: this.state.password
			})
			.then(res => {
				loading.hide();
				if (res.code === 4000) {
					setLocalItem("userInfo", JSON.stringify(res.data));
					toHref("wallet");
				}
			});
	}
	forgetUser() {
		let {
			forgetEmail,
			forgetCode,
			forgetPassword,
			forgetRepassword
		} = this.state;
		if (this.state.forgetEmail.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		if (this.state.forgetCode.length <= 0) {
			Msg.prompt(i18n.t("error.codeEmpty", this.props.lng));
			return;
		}
		if (this.state.forgetPassword.length <= 0) {
			Msg.prompt(i18n.t("error.passwordEmpty", this.props.lng));
			return;
		}
		if (this.state.forgetPassword.length < 6) {
			Msg.prompt(i18n.t("error.passLength", this.props.lng));
			return;
		}
		if (this.state.forgetRepassword.length <= 0) {
			Msg.prompt(i18n.t("error.rpasswordEmpty", this.props.lng));
			return;
		}
		if (this.state.forgetPassword != this.state.forgetRepassword) {
			Msg.prompt(i18n.t("error.passError", this.props.lng));
			return;
		}
		let loading = Msg.load(i18n.t("loading", this.props.lng));
		this.props
			.forgetUser({
				email: forgetEmail,
				code: forgetCode,
				password: forgetPassword,
				password_confirmation: forgetRepassword
			})
			.then(res => {
				loading.hide();
				if (res.code === 4000) {
					this.setState({
						type: "signin",
						forgetEmail: "",
						forgetCode: "",
						forgetPassword: "",
						forgetRepassword: ""
					});
				}
			});
	}
	registerUser() {
		let {
			registerEmail,
			registerCode,
			registerNickname,
			registerPassword,
			registerRepassword
		} = this.state;
		if (this.state.registerEmail.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		if (this.state.registerCode.length <= 0) {
			Msg.prompt(i18n.t("error.codeEmpty", this.props.lng));
			return;
		}
		if (this.state.registerPassword.length <= 0) {
			Msg.prompt(i18n.t("error.passwordEmpty", this.props.lng));
			return;
		}
		if (this.state.registerRepassword.length <= 0) {
			Msg.prompt(i18n.t("error.rpasswordEmpty", this.props.lng));
			return;
		}
		if (this.state.registerRepassword != this.state.registerPassword) {
			Msg.prompt(i18n.t("error.passError", this.props.lng));
			return;
		}
		let loading = Msg.load(i18n.t("loading", this.props.lng));
		this.props
			.registerUser({
				email: registerEmail,
				code: registerCode,
				name: registerEmail,
				password: registerPassword,
				password_confirmation: registerRepassword
			})
			.then(res => {
				loading.hide();
				if (res.code === 4000) {
					Msg.prompt(
						i18n.t("success.registerSuccess", this.props.lng)
					);
					this.setState({
						type: "signin",
						registerEmail: "",
						registerCode: "",
						registerNickname: "",
						registerPassword: "",
						registerRepassword: ""
					});
				}
			});
	}
	render() {
		let { lng } = this.props;
		let {
			type,
			email,
			password,
			registerEmail,
			registerCode,
			registerNickname,
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
					<div className="login" style={{ WebkitAppRegion: "drag" }}>
						<div className="login-content">
							{type == "signin" && (
								<div>
									<div className="login-header">
										<img
											className="login-img"
											src={loginHeader}
											id="loginImg"
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
											<div
												className="btn button-green2"
												onClick={this.signInClick.bind(
													this
												)}
											>
												{t("login.signin", lng)}
											</div>
										</div>
									</div>
									<div className="login-item">
										<div className="login-forget">
											<span
												className="t1"
												onClick={this.goFroget.bind(
													this
												)}
											>
												{t("login.forget", lng)}
											</span>
										</div>
									</div>
									<div className="login-btn">
										<div className="signup ui center">
											<span
												onClick={this.goRegister.bind(
													this
												)}
												className="t1"
											>
												{t("login.signup2", lng)}
											</span>
											{/* <div className="f1" />
											<span
												className="t1"
												onClick={this.goFroget.bind(
													this
												)}
											>
												{t("login.forget", lng)}
											</span> */}
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
											src={loginName1}
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
									{/* <div className="login-item">
										<div className="input-box">
											<input
												className="input"
												type="text"
												placeholder={t(
													"login.nickname",
													lng
												)}
												value={registerNickname}
												onChange={this.inputChange.bind(
													this,
													"registerNickname"
												)}
											/>
										</div>
									</div> */}
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
										<span
											className="loginbtn button-green2"
											onClick={this.registerUser.bind(
												this
											)}
										>
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
											src={loginName1}
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
										<span
											className="loginbtn button-green2"
											onClick={this.forgetUser.bind(this)}
										>
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
