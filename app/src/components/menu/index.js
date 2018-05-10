import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n } from "react-i18next";
import { Popover } from "antd";
import menutop from "#/menutop.png";
import memberImg from "#/tou_ico.png";
import DownLoadProgress from "../downloadprogress/index";
import FeedBack from "../feedback/index";
import { setLocalItem, getLocalItem, toHref } from "../../utils/util";
import "./index.less";

class Menu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showSearch: false,
			user: null,
			isDev: false,
			hasUpdate: null,
			isShowFeed: false
		};
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
		let hasUpdate = sessionStorage.getItem("hasUpdate");
		if (hasUpdate) {
			set.hasUpdate = JSON.parse(hasUpdate);
		}
		set.version = app.getVersion();

		this.setState({
			...set
		});
		ipc.on("checkUpdate", (event, res) => {
			if (!res) {
				sessionStorage.setItem("hasUpdate", false);
			} else {
				sessionStorage.setItem("hasUpdate", JSON.stringify(res));
			}
			this.setState({
				hasUpdate: res
			});
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
	updateClick() {
		ipc.send("downUpdate");
	}
	changeNetWork(type) {
		if (this.state.isDev != type) {
			localStorage.setItem("isDev", type);
			toHref("/");
		}
	}
	showFeedBack() {
		this.setState({
			isShowFeed: true
		});
	}
	closeFeed() {
		this.setState({
			isShowFeed: false
		});
	}
	submitFeed(params) {
		return this.props.submitFeed(params);
	}
	render() {
		const {
			user,
			isDev,
			userInfo,
			hasUpdate,
			isShowFeed,
			version
		} = this.state;
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
						<div className="line" />
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
						{hasUpdate && (
							<div className="hasUpdater">
								<div>
									<i className="font_family icon-oval" />
									<span>
										{t("menu.hasUpdate", lng)}V{
											hasUpdate.version
										}
									</span>
									<span
										className="feedbtn"
										onClick={this.showFeedBack.bind(this)}
									>
										{t("menu.feedback", lng)}
									</span>
								</div>
								<div
									className="updatebtn"
									onClick={this.updateClick.bind(this)}
								>
									<span>{t("menu.goUpdate", lng)}</span>
									<i className="font_family icon-golink" />
								</div>
							</div>
						)}
						{!hasUpdate && (
							<div className="hasUpdater">
								<span>
									{t("menu.nowVersion", lng)}V{version}
								</span>
								<span
									className="feedbtn"
									onClick={this.showFeedBack.bind(this)}
								>
									{t("menu.feedback", lng)}
								</span>
							</div>
						)}

						{isShowFeed && (
							<FeedBack
								lng={lng}
								close={this.closeFeed.bind(this)}
								submit={this.submitFeed.bind(this)}
							/>
						)}
						<DownLoadProgress lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
export default Menu;
