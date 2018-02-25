import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import chooseico from "#/weixuanze_ico.png";
import chooseico2 from "#/xuanze_ico.png";

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
					<div className="main-box addasset">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content addasset-content">
								<div className="title">Add Asset</div>
								<div className="cokBox">
									<ul className="assetUl">
										<li className="assetCell">
											<div className="imgbox">
												<img
													className="img"
													src={chooseico}
													alt=""
												/>
											</div>
											<div className="nameStr">
												Raiden(RDN)
											</div>
											<div className="choose">
												<img
													className="img"
													src={chooseico}
													alt=""
												/>
											</div>
										</li>
										<li className="assetCell">
											<div className="imgbox">
												<img
													className="img"
													src={chooseico}
													alt=""
												/>
											</div>
											<div className="nameStr">
												Raiden(RDN)
											</div>
											<div className="choose">
												<img
													className="img"
													src={chooseico2}
													alt=""
												/>
											</div>
										</li>
									</ul>
									<button className="confirmBtn button-green">
										confirm
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
