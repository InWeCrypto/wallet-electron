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
		this.deleteIPC = this.deleteIPC.bind(this);
		//ipc.once("deleteWatchWallet", this.deleteIPC);
	}
	componentWillUnmount() {
		this.setState({
			id: ""
		});
		//ipc.removeListener("deleteLocalWallet", this.deleteIPC);
	}
	deleteIPC() {
		this.deleteWatch(true);
	}
	deleteWatch(type) {
		var delW = dialog.showMessageBox(EWin, {
			type: "question",
			title: i18n.t("deletetip.title", this.props.lng),
			message: i18n.t("deletetip.txt", this.props.lng),
			buttons: [
				i18n.t("deletetip.sure", this.props.lng),
				i18n.t("deletetip.cannel", this.props.lng)
			]
		});
		if (delW == 0) {
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
		return;
		// if (!type) {
		// 	ipc.send(
		// 		"question",
		// 		i18n.t("deletetip.title", this.props.lng),
		// 		i18n.t("deletetip.txt", this.props.lng),
		// 		true
		// 	);
		// } else {
		// 	this.props
		// 		.deleteWatchWallet({
		// 			id: this.state.id
		// 		})
		// 		.then(res => {
		// 			if (res.code === 4000) {
		// 				toHref("wallet");
		// 			}
		// 		});
		// }
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
										<div className="icon-box keyico" />
										<div className="name">
											{t("manageWatch.change", lng)}
										</div>
									</div>
									<div
										className="hotarea"
										onClick={() => {
											this.deleteWatch();
										}}
									>
										<div className="icon-box deleteico" />
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
