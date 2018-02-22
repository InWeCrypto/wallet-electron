import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
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
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {}
	getPhoneNum(e) {
		let phoneNum = e.target.value;
		this.setState({
			phoneNum
		});
	}
	sendCode() {
		let phoneNum = this.state.phoneNum;
		let pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;

		if (!phoneNum) {
			Modal.warning({
				title: "提示",
				content: "手机号不能为空"
			});
			return;
		}
		if (pattern.test(phoneNum)) {
			let params = {
				phone: phoneNum
			};
			this.props.getCode(params);
		} else {
			//alert("请输入正确的手机号");
			Modal.warning({
				title: "提示",
				content: "请输入正确格式到手机号"
			});
		}
	}
	getCode(e) {
		let code = e.target.value;
		this.setState({
			code
		});
	}
	loginInClick() {
		let code = this.state.code;
		let phoneNum = this.state.phoneNum;
		if (!code) {
			Modal.warning({
				title: "提示",
				content: "请输入验证码"
			});
			return;
		}
		let pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
		if (!phoneNum) {
			Modal.warning({
				title: "提示",
				content: "手机号不能为空"
			});
			return;
		}
		if (pattern.test(phoneNum)) {
			//获取登录信息
			let params = {
				phone: phoneNum,
				code: code
			};
			this.props.loginIn(params).then(res => {
				if (res.code === 4000) {
					toHref("/home");
				}
			});
		} else {
			Modal.warning({
				title: "提示",
				content: "请输入正确格式到手机号"
			});
		}
	}
	devChooseClick(type) {
		if (type === "dev") {
			window.localStorage.setItem("isDev", true);
			this.setState({
				checkDev: false
			});
		}
		if (type === "pro") {
			window.localStorage.setItem("isDev", false);
			this.setState({
				checkDev: false
			});
		}
	}
	render() {
		const { seconde, checkDev } = this.state;
		const {} = this.props;
		return (
			<div className="loginpage">
				<h1 className="login-title1"> InWeCrypto </h1>
				<h1 className="login-title2"> 后台管理系统 </h1>
				{checkDev && (
					<div className="devChoose">
						<Button
							className="devButton"
							onClick={this.devChooseClick.bind(this, "dev")}
						>
							测试环境
						</Button>
						<Button
							className="devButton"
							onClick={this.devChooseClick.bind(this, "pro")}
						>
							正式环境
						</Button>
						<div
							style={{
								color: "#a4a4a4",
								textAlign: "center",
								paddingTop: ".2rem"
							}}
						>
							请选择数据管理环境
						</div>
					</div>
				)}

				{!checkDev && (
					<div>
						<div className="login-phoneNum">
							<input
								placeholder="手机号登录"
								type="text"
								maxLength="11"
								onChange={this.getPhoneNum.bind(this)}
							/>
							<button onClick={this.sendCode.bind(this)}>
								验证码
							</button>
						</div>
						<div className="login-code">
							<input
								type="text"
								placeholder="验证码"
								onChange={this.getCode.bind(this)}
							/>
						</div>
						<div style={{ textAlign: "center" }}>
							<button
								className="login-inbtn"
								onClick={this.loginInClick.bind(this)}
							>
								进入
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
