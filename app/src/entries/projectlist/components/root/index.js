import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
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
		let arr = [];
		for (var i = 0; i < 100; i++) {
			arr.push(1);
		}
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box projectlist">
						<Menu curmenu="project" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content project-content">
								<div className="search-box">
									<img src={searchimg} alt="" />
									<input type="text" />
								</div>
								<div className="search-list">
									<ul className="search-list-ul">
										{arr.map((val, idex) => {
											return (
												<li
													key={idex}
													className="search-cell"
												>
													<div className="imgbox">
														<img
															src={searchimg}
															alt=""
														/>
													</div>
													<div className="messBox">
														<div className="name">
															TNC &nbsp; (Trinity)
														</div>
														<div className="mess">
															Offchain Scaling All
														</div>
													</div>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
