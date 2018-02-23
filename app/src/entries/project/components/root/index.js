import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
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
			arr.push("1");
		}
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box project">
						<Menu curmenu="project" />
						<div className="content-container">
							<HeaderNav />
							<div className="content">123</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
