import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import imgfile from "#/file_ico_s.png";
import imgcopy from "#/copy_ico_s.png";

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
					<div className="main-box keystore">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content keystore-content">
								<div className="title">Keystore</div>
								<div className="cokBox">
									<div className="titleImg " />
									<div className="showWordBox">
										1、备份助记词能让您丢失钱包的时候快速找回
										addressALDJhwgptv1cmWkh613-4002-9cffc0c91f75810f","version":3
									</div>
									<div className="btnBox">
										<div className="left btn-cell">
											<div className="img">
												<img
													className="img"
													src={imgfile}
													alt=""
												/>
												<p>Export in file</p>
											</div>
										</div>
										<div className="right btn-cell">
											<div className="img">
												<img
													className="img"
													src={imgcopy}
													alt=""
												/>
												<p>Copy</p>
											</div>
										</div>
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
