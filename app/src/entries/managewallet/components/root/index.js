import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import icon1 from "#/mnemonic_ico.png";
import icon2 from "#/key.png";
import icon3 from "#/delet.png";
import searchimg from "#/search_ico.png";

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
					<div className="main-box managewallet">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content managewallet-content">
								<div className="title">
									Manager wallet setting
								</div>
								<div className="title2">backup your wallet</div>
								<div className="hotarea-box">
									<div className="hotarea inMnemonic">
										<div className="imgbox">
											<img
												className="img"
												src={icon1}
												alt=""
											/>
										</div>
										<div className="name">Mnemonic</div>
										<div className="hideBox">
											<input
												placeholder="Enter your password"
												type="text"
											/>
											<div className="btnBox">
												<button className="cancel">
													cancel
												</button>
												<button className="comfirm">
													comfirm
												</button>
											</div>
										</div>
									</div>
									<div className="hotarea">
										<div className="imgbox">
											<img
												className="img"
												src={icon2}
												alt=""
											/>
										</div>
										<div className="name">Keystore</div>
									</div>
									<div className="hotarea">
										<div className="imgbox">
											<img
												className="img"
												src={icon3}
												alt=""
											/>
										</div>
										<div className="name">Delete</div>
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
