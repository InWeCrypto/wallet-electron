import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import imgico from "#/tishi_ico.png";
import { toHref } from "../../../../utils/util.js";

import "./index.less";
import { link } from "fs";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isfirstPage: true
		};
	}
	componentDidMount() {}
	//下一步
	nextPage() {
		toHref("mnemonicsure");
	}
	render() {
		let { lng } = this.props;
		let { isfirstPage } = this.state;
		let arr = [
			"you1",
			"you2",
			"you3",
			"you4",
			"you5",
			"you6",
			"you7",
			"you8",
			"you9",
			"you0",
			"you00"
		];
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box mnemonic">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content mnemonic-content">
								<div className="title">
									Manager wallet setting
								</div>
								<div className="cokBox">
									{isfirstPage && (
										<div className="titleImg">
											<img
												className="img"
												src={imgico}
												alt=""
											/>
										</div>
									)}

									<div className="showWordBox">
										<ul className="wordUl">
											{arr.map((val, idx) => {
												return (
													<li
														key={idx}
														className="word"
													>
														{val}
													</li>
												);
											})}
										</ul>
									</div>
									{isfirstPage ? (
										<div className="boxq1">
											<p className="mess">
												1、备份助记词能让您丢失钱包的时候快速找回
											</p>
											<p className="mess">
												2、请务必将以下助记词抄录下来，并且保存在安全的地方
											</p>
											<p className="mess">
												3、助记词一旦备份成功，此备份步骤不会再出现
											</p>
											<button
												className="next"
												onClick={this.nextPage.bind(
													this
												)}
											>
												Next
											</button>
										</div>
									) : (
										<div className="boxq2">
											<div className="q2title">
												待选助记词
											</div>
											<ul className="helpList">
												{arr.map((val, idx) => {
													return (
														<li className="helpWord">
															{val}
														</li>
													);
												})}
											</ul>
											<button className="next">
												Comfirm
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
