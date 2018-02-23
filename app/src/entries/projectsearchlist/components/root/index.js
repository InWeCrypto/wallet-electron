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
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box project">
						<Menu curmenu="project" />
						<div className="content-container">
							<HeaderNav />
							<div className="content project-content">
								<div className="title Hide">
									Search the project you want to know
								</div>
								<div className="search-box">
									<img src={searchimg} alt="" />
									<input type="text" />
								</div>
								<div className="tags-box">
									<div className="tagsname">
										Everyone in the search
									</div>
									<ul className="tags">
										<li className="tags-cell">Trinity</li>
										<li className="tags-cell">
											TrinityTrinitynity
										</li>
										<li className="tags-cell">
											Trinitynity
										</li>
										<li className="tags-cell">Tri</li>
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
