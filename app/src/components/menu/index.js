import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n } from "react-i18next";
import { Popover } from "antd";
import memberImg from "#/tou_ico.png";
import { setLocalItem, toHref } from "../../utils/util";

import "./index.less";

class Menu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { showSearch: false, user: null, isDev: false };
	}
	componentDidMount() {
		let isDev = localStorage.getItem("isDev");

		if (isDev && isDev != "false") {
			this.setState({
				isDev: true
			});
		} else {
			this.setState({
				isDev: false
			});
		}
	}
	changeLanguage(type) {
		setLocalItem("language", type);
		if ((window.location.hash = "#wallet")) {
			window.location.reload();
		} else {
			toHref("wallet");
		}
	}
	changeNetWork(type) {
		if (this.state.isDev != type) {
			localStorage.setItem("isDev", type);
			toHref("/");
		}
	}
	render() {
		const { user, isDev } = this.state;
		const { curmenu, curchildmenu, lng } = this.props;
		const language = (
			<div>
				<div onClick={this.changeLanguage.bind(this, "en")}>
					{i18n.t("language.en", lng)}
				</div>
				<div onClick={this.changeLanguage.bind(this, "zh")}>
					{i18n.t("language.cn", lng)}
				</div>
			</div>
		);
		const netWork = (
			<div>
				<div onClick={this.changeNetWork.bind(this, false)}>
					{i18n.t("network.formal", lng)}
				</div>
				<div onClick={this.changeNetWork.bind(this, true)}>
					{i18n.t("network.test", lng)}
				</div>
			</div>
		);

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="menu-left">
						<p className="title">InWeWallet</p>
						<img className="user-logo" src={memberImg} alt="" />
						<ul className="menuList">
							{/* <li className={curmenu == "dashboard" ? "cur" : ""}>
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
							</li> */}
							<li className={curmenu == "wallet" ? "cur" : ""}>
								<div className="menu-wallet menuicon" />
								<div className="menu-name">
									<NavLink
										to={{
											pathname: "/wallet"
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
							{/* <li
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
							</li> */}
						</ul>
						<div className="setting">
							<div>
								<span className="name">
									{t("network.network", lng)}:
								</span>
								<Popover content={netWork} trigger="click">
									{isDev
										? t("network.test", lng)
										: t("network.formal", lng)}
								</Popover>
							</div>
							<div>
								<span className="name">
									{t("language.current", lng)}:
								</span>
								<Popover content={language} trigger="click">
									{lng == "en"
										? t("language.en", lng)
										: t("language.cn", lng)}
								</Popover>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default Menu;
