import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import { getQuery } from "../../../../utils/util";
import "./index.less";
import keyicon from "#/key.png";
import moneicon from "#/mnemonic_ico.png";
import priicon from "#/private_ico.png";
import watchicon from "#/watch_ico.png";
import keyicon1 from "#/key_s.png";
import moneicon1 from "#/mnemonic_ico_s.png";
import priicon1 from "#/private_ico_s.png";
import watchicon1 from "#/watch_ico_s.png";

import ethicon from "#/ethicon.png";
import neoicon from "#/neoicon.png";

import Item from "antd/lib/list/Item";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			walletId: null,
			name: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.isChange && q.type) {
			this.setState({
				type: 3,
				walletId: q.type,
				name: q.name
			});
		}
		if (q.showtype) {
			this.setState({
				type: q.showtype
			});
		}
		if (q.walletid) {
			this.setState({
				walletId: q.walletid
			});
		}
		this.props.getWalletType();
	}
	chooseType(item) {
		this.setState({
			type: 2,
			walletId: item.id
		});
		let history = this.props.history;
		history.push({
			pathname: history.location.pathname,
			search:
				history.location.search && history.location.search.length > 0
					? `${history.location.search}&showtype=2&walletid=${
							item.id
					  }`
					: `showtype=2&walletid=${item.id}`
		});
	}
	backClick() {
		if (this.state.type == 2) {
			this.setState({
				type: 1
			});
		}
		this.props.history.go(-1);
	}
	submitFeed(params) {
		return this.props.submitFeedBack(params);
	}
	render() {
		let { lng, walletTypes } = this.props;
		let { type, walletId, name } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu
							submitFeed={this.submitFeed.bind(this)}
							curmenu="wallet"
							lng={lng}
						/>
						<div className="content-container">
							<HeaderNav
								back={this.backClick.bind(this)}
								history={this.props.history}
							/>
							<div className="content">
								<div className="importwallet">
									<div className="import-title">
										{type != 3
											? t("importWallet.title", lng)
											: t("importWallet.title1", lng)}
									</div>
									{type == 1 && (
										<div className="wallet-type">
											{walletTypes &&
												walletTypes.length > 0 &&
												walletTypes.map(
													(item, index) => {
														if (index == 2) {
															return null;
														}
														return (
															<div
																key={index}
																className="type-item"
																onClick={this.chooseType.bind(
																	this,
																	item
																)}
															>
																<span
																	className={
																		item.id ==
																		1
																			? "img eth"
																			: "img neo"
																	}
																/>
																<div className="t">
																	{item.name}
																</div>
															</div>
														);
													}
												)}
										</div>
									)}
									{type == 2 && (
										<div className="import-container">
											<div className="ui jcenter">
												<Link
													to={{
														pathname:
															"importkeystore",
														search: `?wallettype=${walletId}`
													}}
													className="import-group"
												>
													<span className="importicon key" />
													{/* <img
														className="importicon"
														src={keyicon}
													/> */}
													<div className="t1">
														{t(
															"importWallet.keystore",
															lng
														)}
													</div>
												</Link>
												<Link
													to={{
														pathname:
															"importmnemonic",
														search: `?wallettype=${walletId}`
													}}
													className="import-group"
												>
													<span className="importicon moneicon" />
													<div className="t1">
														{t(
															"importWallet.mnemonic",
															lng
														)}
													</div>
												</Link>
											</div>
											<div className="ui jcenter">
												<Link
													to={{
														pathname:
															"importprivate",
														search: `?wallettype=${walletId}`
													}}
													className="import-group"
												>
													<span className="importicon priicon" />
													<div className="t1">
														{t(
															"importWallet.private",
															lng
														)}
													</div>
												</Link>
												<Link
													to={{
														pathname: "importwatch",
														search: `?wallettype=${walletId}`
													}}
													className="import-group"
												>
													<span className="importicon watchicon" />
													<div className="t1">
														{t(
															"importWallet.watch",
															lng
														)}
													</div>
												</Link>
											</div>
										</div>
									)}
									{type == 3 && (
										<div className="import-container">
											<div className="ui jcenter">
												<Link
													to={{
														pathname:
															"importkeystore",
														search: `?wallettype=${walletId}&name=${name}&isChange=true`
													}}
													className="import-group"
												>
													<span className="importicon key" />
													<div className="t1">
														{t(
															"importWallet.keystore",
															lng
														)}
													</div>
												</Link>
												<Link
													to={{
														pathname:
															"importmnemonic",
														search: `?wallettype=${walletId}&name=${name}&isChange=true`
													}}
													className="import-group"
												>
													<span className="importicon moneicon" />
													<div className="t1">
														{t(
															"importWallet.mnemonic",
															lng
														)}
													</div>
												</Link>
											</div>
											<div className="ui jcenter">
												<Link
													to={{
														pathname:
															"importprivate",
														search: `?wallettype=${walletId}&name=${name}&isChange=true`
													}}
													className="import-group"
												>
													<span className="importicon priicon" />
													<div className="t1">
														{t(
															"importWallet.private",
															lng
														)}
													</div>
												</Link>
												<div className="import-group disnone" />
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
