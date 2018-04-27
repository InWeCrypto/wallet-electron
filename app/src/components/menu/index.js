import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n } from "react-i18next";
import { Popover } from "antd";
import menutop from "#/menutop.png";
import memberImg from "#/tou_ico.png";
import { setLocalItem, getLocalItem, toHref } from "../../utils/util";
import "./index.less";

class Menu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { showSearch: false, user: null, isDev: false };
	}
	componentDidMount() {
		let isDev = localStorage.getItem("isDev");
		let userInfo = getLocalItem("userInfo");
		let set = {};
		if (userInfo) {
			set.userInfo = JSON.parse(userInfo.data);
		}
		if (isDev && isDev != "false") {
			set.isDev = true;
		} else {
			set.isDev = false;
		}
		this.setState({
			...set
		});
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
		const { user, isDev, userInfo } = this.state;
		const { curmenu, curchildmenu, lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div
						className="menu-left"
						style={{ WebkitAppRegion: "drag" }}
					>
						<p className="title">
							<img className="topimg" src={menutop} />
						</p>
						<img
							className="user-logo"
							src={
								userInfo && userInfo.img
									? userInfo.img
									: memberImg
							}
						/>
						<div className="moneybox">
							<div className="total-money">
								{lng == "en" ? "$" : "￥"}
								900000.00
							</div>
							<div className="text">Total Balance</div>
						</div>
						<div className="line" />
						<ul className="menuList">
							<li className={curmenu == "dashboard" ? "cur" : ""}>
								<div className="menu-dashboard menuicon" />
								<div className="menu-name">
									<NavLink
										to={{
											pathname: "/dashboard"
										}}
									>
										{t("menu.dashboard", lng)}
									</NavLink>
								</div>
							</li>
							<li className={curmenu == "wallet" ? "cur" : ""}>
								<NavLink
									to={{
										pathname: "/wallet"
									}}
								>
									<div className="menu-wallet menuicon" />
									<div className="menu-name">
										{t("menu.wallet", lng)}
									</div>
								</NavLink>
							</li>
							{/* <li className={curmenu == "project" ? "cur" : ""}>
								<NavLink
									to={{
										pathname: "/project"
									}}
								>
									<div className="menu-project menuicon" />
									<div className="menu-name">
										{t("menu.project", lng)}
									</div>
								</NavLink>
							</li> */}
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
					</div>
				)}
			</I18n>
		);
	}
}
export default Menu;
