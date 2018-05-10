import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { getQuery, toHref } from "../../../../utils/util";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import chooseico from "#/weixuanze_ico.png";
import chooseico2 from "#/xuanze_ico.png";
import PerfectScrollbar from "perfect-scrollbar";
import "./index.less";
import { link } from "fs";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.myScroll = null;
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q && q.walletid && q.wallettype) {
			this.props.getAssetsList({
				wallet_category_id: q.wallettype,
				wallet_id: q.walletid
			});
			(set.wallet_id = q.walletid),
				(set.wallet_category_id = q.wallettype);
		}
		if (q.isWatch) {
			set.isWatch = q.isWatch;
		}
		this.setState({
			...set
		});
		this.myScroll = new PerfectScrollbar("#listbox");
	}
	checkAsset(item) {
		this.props.checkChange({
			id: item.id,
			state: !item.isCheck
		});
	}
	submitData() {
		let list = [];
		this.props.assetsList.list.map((item, index) => {
			if (item.isCheck) {
				list.push(item.id);
			}
		});
		let params = {
			wallet_id: this.state.wallet_id,
			gnt_category_ids: `[${list.join(",")}]`
		};
		this.props.submitAddAsset(params).then(res => {
			if (res.code === 4000) {
				if (this.state.isWatch) {
					toHref(`watchwallet?id=${this.state.wallet_id}`);
					return;
				}
				if (this.state.wallet_category_id == 1 && !this.state.isWatch) {
					toHref(`ethwallet?id=${this.state.wallet_id}`);
					return;
				}
				if (this.state.wallet_category_id == 2 && !this.state.isWatch) {
					toHref(`neowallet?id=${this.state.wallet_id}`);
					return;
				}
			}
		});
	}
	submitFeed(params) {
		return this.props.submitFeedBack(params);
	}
	render() {
		let { lng, assetsList } = this.props;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box addasset">
						<Menu
							submitFeed={this.submitFeed.bind(this)}
							curmenu="wallet"
							lng={lng}
						/>
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content addasset-content">
								<div className="title">
									{t("addAsset.title")}
								</div>
								<div className="cokBox">
									<ul className="assetUl" id="listbox">
										{assetsList &&
											assetsList.list &&
											assetsList.list.length > 0 &&
											assetsList.list.map(
												(item, index) => {
													return (
														<li
															key={index}
															className="assetCell"
															onClick={this.checkAsset.bind(
																this,
																item
															)}
														>
															<div className="imgbox">
																<img
																	className="img"
																	src={
																		item.icon
																	}
																/>
															</div>
															<div className="nameStr">
																{item.name}
																{/* Raiden(RDN) */}
															</div>
															<div className="choose">
																{!item.isCheck && (
																	<img
																		className="img"
																		src={
																			chooseico
																		}
																	/>
																)}
																{item.isCheck && (
																	<img
																		className="img"
																		src={
																			chooseico2
																		}
																	/>
																)}
															</div>
														</li>
													);
												}
											)}
									</ul>
									<button
										onClick={this.submitData.bind(this)}
										className="confirmBtn button-green"
									>
										{t("addAsset.confirm")}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
