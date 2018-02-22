import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n } from "react-i18next";

// import memberImg from "../../assets/images/touxiang_icon.png";

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
		const { curmenu, curchildmenu, lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="menu-left">
						{/* <img className="user-logo" src={memberImg} alt="" /> */}
						<div className="user-name">{user && user["name"]}</div>
						<div className="user-position">
							{user &&
								user.menu_group &&
								user.menu_group.group_name}
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
										{t("menu.project", lng)}
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
