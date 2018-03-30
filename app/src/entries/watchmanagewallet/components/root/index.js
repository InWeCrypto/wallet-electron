import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import { getQuery, toHref } from "../../../../utils/util";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import icon1 from "#/mnemonic_ico.png";
import icon2 from "#/key.png";
import icon3 from "#/delet.png";
import searchimg from "#/search_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			id: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.id && q.type && q.name) {
			this.setState({
				id: q.id,
				name: q.name,
				type: q.type
			});
		}
	}
	deleteWatch() {
		this.props
			.deleteWatchWallet({
				id: this.state.id
			})
			.then(res => {
				if (res.code === 4000) {
					toHref("wallet");
				}
			});
	}
	goChange() {
		toHref(
			"importwallet",
			`name=${this.state.name}&type=${this.state.type}&isChange=true`
		);
	}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box managewallet">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content managewallet-content">
								<div className="title">
									{t("manageWatch.title", lng)}
								</div>
								{/* <div className="title2">backup your wallet</div> */}
								<div className="hotarea-box">
									<div
										className="hotarea"
										onClick={this.goChange.bind(this)}
									>
										<div className="imgbox">
											<img
												className="img"
												src={icon2}
												alt=""
											/>
										</div>
										<div className="name">
											{t("manageWatch.title", lng)}
										</div>
									</div>
									<div
										className="hotarea"
										onClick={this.deleteWatch.bind(this)}
									>
										<div className="imgbox">
											<img
												className="img"
												src={icon3}
												alt=""
											/>
										</div>
										<div className="name">
											{t("manageWatch.delete", lng)}
										</div>
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
