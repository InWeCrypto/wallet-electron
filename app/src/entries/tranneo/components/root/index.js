import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import ConfirmPassword from "../../../../components/confirmpassword";
import SelectWallet from "../../../../components/selectwallet";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
import searchimg from "#/search_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			sendAddress: "",
			sendNumber: ""
		};
	}
	componentDidMount() {}
	selectWallet(res) {
		console.log(res);
	}
	inputChange(type, event) {
		this.setState({
			[type]: event.target.value
		});
	}
	render() {
		let { lng } = this.props;
		let { sendAddress, sendNumber } = this.state;
		const placeholder = "请选择钱包";
		let options = [
			{
				name: "222",
				banlance: 222
			},
			{
				name: "22333",
				banlance: 222
			}
		];
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box tran-neo">
						<Menu curmenu="dashboard" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content tran-content">
								<div className="title">Transfer</div>
								<div className="tran-box">
									<div className="send-item">
										<div className="send-name">
											{t("walletDetail.sendTitle", lng)}
										</div>
										<div className="input-box">
											<input
												type="text"
												className="input"
												value={sendAddress}
												onChange={this.inputChange.bind(
													this,
													"sendAddress"
												)}
											/>
										</div>
									</div>
									<div className="send-item">
										<div className="send-name">
											{t("walletDetail.amount", lng)}
										</div>
										<div className="input-box">
											<input
												type="text"
												className="input"
												value={sendNumber}
												onChange={this.inputChange.bind(
													this,
													"sendNumber"
												)}
											/>
											<span className="name">NEO</span>
										</div>
									</div>
									<div className="send-item">
										<div className="send-name">
											{t("walletDetail.amount", lng)}
										</div>
										<div className="input-box">
											<SelectWallet
												lng={lng}
												onChange={this.selectWallet.bind(
													this
												)}
												options={options}
												placeholder={placeholder}
											/>
										</div>
									</div>

									<div className="btn-box">
										<button className="button-green">
											{t("walletDetail.send", lng)}
										</button>
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
