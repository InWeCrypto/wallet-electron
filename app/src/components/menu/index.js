import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import memberImg from "../../assets/images/touxiang_icon.png";

import "./index.less";
class Menu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { showSearch: false, user: null };
	}
	componentDidMount() {
		let user = localStorage.getItem("userInfo");
		this.setState({
			user: JSON.parse(JSON.parse(user).data)
		});
	}
	render() {
		const { user } = this.state;
		const { curmenu, curchildmenu } = this.props;
		return (
			<div className="menu-left">
				<img className="user-logo" src={memberImg} alt="" />
				<div className="user-name">{user && user["name"]}</div>
				<div className="user-position">
					{user && user.menu_group && user.menu_group.group_name}
				</div>
				<ul className="menuList">
					<li className={curmenu == "project" ? "cur" : ""}>
						<div className="menu-project menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/project"
								}}
							>
								项目库
							</NavLink>
						</div>
					</li>
					<li className={curmenu == "news" ? "cur" : ""}>
						<div className="menu-news menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/news"
								}}
							>
								资讯管理
							</NavLink>
						</div>
					</li>
					<li className={curmenu == "trading" ? "cur" : ""}>
						<div className="menu-trading menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/trading"
								}}
							>
								空投设置
							</NavLink>
						</div>
					</li>
					<li className={curmenu == "advertisement" ? "cur" : ""}>
						<div className="menu-swiper menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/advertisement"
								}}
							>
								广告管理
							</NavLink>
						</div>
					</li>
					{/* <li className={curmenu == "comment" ? "cur" : ""}>
						<div className="menu-comment menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/comment"
								}}
							>
								评论管理
							</NavLink>
						</div>
					</li> */}
					<li className={curmenu == "user" ? "cur" : ""}>
						<div className="menu-user menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/user"
								}}
							>
								用户管理
							</NavLink>
						</div>
					</li>
					<li className={curmenu == "capital" ? "cur" : ""}>
						<div className="menu-wallet menuicon" />
						<div className="menu-name">
							<NavLink
								to={{
									pathname: "/capital"
								}}
							>
								资产管理
							</NavLink>
						</div>
					</li>
					<li className={curmenu == "system" ? "cur" : ""}>
						<div className="menu-system menuicon" />
						<div className="menu-name">系统设置</div>

						<div className="childMenu">
							<span
								className={curchildmenu == "label" ? "cur" : ""}
							>
								<NavLink
									to={{
										pathname: "/label"
									}}
								>
									资讯标签
								</NavLink>
							</span>
							{/* <span
								className={
									curchildmenu == "social" ? "cur" : ""
								}
							>
								<NavLink
									to={{
										pathname: "/social"
									}}
								>
									社交管理
								</NavLink>
							</span> */}
							<span
								className={
									curchildmenu == "authority" ? "cur" : ""
								}
							>
								<NavLink
									to={{
										pathname: "/authority"
									}}
								>
									菜单管理
								</NavLink>
							</span>
							<span
								className={
									curchildmenu == "permission" ? "cur" : ""
								}
							>
								<NavLink
									to={{
										pathname: "/permission"
									}}
								>
									权限管理
								</NavLink>
							</span>
							<span
								className={
									curchildmenu == "employee" ? "cur" : ""
								}
							>
								<NavLink
									to={{
										pathname: "/employee"
									}}
								>
									员工管理
								</NavLink>
							</span>
						</div>
					</li>
				</ul>
			</div>
		);
	}
}
export default Menu;
