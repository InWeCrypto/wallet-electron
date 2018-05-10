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
	submitFeed(params) {
		return this.props.submitFeedBack(params);
	}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box projectlist">
						<Menu
							submitFeed={this.submitFeed.bind(this)}
							curmenu="project"
							lng={lng}
						/>
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content project-content">123</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
