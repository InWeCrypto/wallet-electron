import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import imgico from "#/tishi_ico.png";

import "./index.less";
import { link } from "fs";
import { stringify } from "querystring";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isfirstPage: true,
			arrShow: [],
			arr: [
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
			]
		};
	}
	componentDidMount() {}
	chooseWord(val, idx) {
		let { arr, arrShow } = this.state;
		arr.splice(idx, 1);
		arrShow.push(val);
		this.setState({
			arrShow: JSON.parse(JSON.stringify(arrShow))
		});
	}
	render() {
		let { lng } = this.props;
		let { isfirstPage, arr, arrShow } = this.state;

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
									<div className="showWordBox">
										<ul className="wordUl">
											{arrShow.map((val, idx) => {
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

									<div className="boxq2">
										<div className="q2title">
											待选助记词
										</div>
										<ul className="helpList">
											{arr.map((val, idx) => {
												return (
													<li
														key={idx}
														className="helpWord"
														onClick={this.chooseWord.bind(
															this,
															val,
															idx
														)}
													>
														{val}
													</li>
												);
											})}
										</ul>
										<button className="next">
											Comfirm
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
