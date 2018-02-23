import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n } from "react-i18next";

import memberImg from "#/tou_ico.png";

import "./index.less";
class Menu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { showSearch: false, user: null };
	}
	componentDidMount() {}
	render() {
		const { user } = this.state;
		const { curmenu, curchildmenu, lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="menu-left">
						<p className="title">InWeWallet</p>
						<img className="user-logo" src={memberImg} alt="" />
						<ul className="menuList">
							<li className={curmenu == "dashboard" ? "cur" : ""}>
								<div className="menu-dashboard menuicon" />
								<div className="menu-name">
									<NavLink
										to={{
											pathname: "/project"
										}}
									>
										{t("menu.dashboard", lng)}
									</NavLink>
								</div>
							</li>
							<li className={curmenu == "wallet" ? "cur" : ""}>
								<div className="menu-wallet menuicon" />
								<div className="menu-name">
									<NavLink
										to={{
											pathname: "/project"
										}}
									>
										{t("menu.wallet", lng)}
									</NavLink>
								</div>
							</li>
							<li className={curmenu == "project" ? "cur" : ""}>
								<div className="menu-project menuicon" />
								<div className="menu-name">
									<NavLink
										to={{
											pathname: "/project"
										}}
									>
										{t("menu.project", lng)}
									</NavLink>
								</div>
							</li>
							<li
								className={curmenu == "myfollowup" ? "cur" : ""}
							>
								<div className="menu-follow menuicon" />
								<div className="menu-name">
									<NavLink
										to={{
											pathname: "/project"
										}}
									>
										{t("menu.myfollowup", lng)}
									</NavLink>
								</div>
							</li>
						</ul>
					</div>
				)}
			</I18n>
		);
	}
}
export default Menu;
