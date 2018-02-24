import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import imgico from "#/tishi_ico.png";

import "./index.less";
import { link } from "fs";

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
					<div className="main-box gas">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content gas-content">
								<div className="title">Claim Gas</div>
								<div className="cokBox">
									<div className="gasBox limit">
										<div className="gastitle">
											Withdraw Gas Limit
										</div>
										<div className="money">300.0000</div>
										<button className="total">
											Total Claim
										</button>
									</div>
									<div className="gasBox frozen ">
										<div className="gastitle">
											Frozen Gas
										</div>
										<div className="money">300.0000</div>
										<input
											type="text"
											placeholder="Enter your password"
										/>
										<button className="total">
											Unfreeze
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
