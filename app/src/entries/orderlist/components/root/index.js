import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import {
	getQuery,
	getLocalTime,
	getNumFromStr,
	getEthNum
} from "../../../../utils/util";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
import searchimg from "#/search_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: null,
			wallet_id: null,
			asset_id: null,
			address: null,
			info: null,
			page: 0,
			isGetting: false
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q.wallet_id) {
			set.wallet_id = q.wallet_id;
		}
		if (q.flag) {
			set.flag = q.flag;
		}
		if (q.asset_id) {
			set.asset_id = q.asset_id;
		}
		if (q.address) {
			set.address = q.address;
		}
		if (q.timetamp) {
			set.info = JSON.parse(sessionStorage.getItem(`${q.timetamp}`));
		}
		if (q.wallet_id && q.flag && q.asset_id) {
			this.props
				.getStartOrderList({
					flag: q.flag,
					wallet_id: q.wallet_id,
					asset_id: q.asset_id,
					size: 20,
					page: this.state.page
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							page: this.state.page + 1
						});
					}
				});
		}
		this.setState(set);
		let box = document.querySelector("#listBox");
		box.addEventListener(
			"scroll",
			() => {
				this.getPageData();
			},
			false
		);
	}
	getPageData() {
		let box = document.querySelector("#listBox");
		let st = box.scrollTop;
		let h = box.offsetHeight;
		let sh = box.scrollHeight;
		if (h + st >= sh) {
			this.props
				.getOrderList({
					flag: this.state.flag,
					wallet_id: this.state.wallet_id,
					asset_id: this.state.asset_id,
					size: 20,
					page: this.state.page
				})
				.then(res => {
					if (res.code === 4000) {
						this.setState({
							page: this.state.page + 1
						});
					}
				});
		}
	}
	showMoreClick(idx) {
		this.props.changeShow(idx);
	}
	render() {
		let { lng, orderList } = this.props;
		let { flag, info, address } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box projectlist">
						<Menu curmenu="project" lng={lng} />
						<div className="content-container">
							<HeaderNav />
							<div className="content orderlist">
								<div className="info">
									<div className="t1">
										<img
											className="img"
											src={info && info.img}
										/>
										<span>{info && info.name}</span>
										<span>({info && info.name})</span>
									</div>
									<div className="t2">
										{info &&
											info.number != "undefined" && (
												<span>
													{Number(
														Number(
															info.number
														).toFixed(4)
													)}
												</span>
											)}

										<span className="t3">
											({lng == "en" ? "$" : "￥"}
											{(
												(info && info.number) *
												(info
													? lng == "en"
														? info.price_usd
														: info.price_cny
													: 0)
											).toFixed(2)})
										</span>
									</div>
								</div>
								<div className="list-box" id="listBox">
									{flag == "neo" &&
										orderList &&
										orderList.list &&
										orderList.list.length > 0 &&
										orderList.list.map((item, index) => {
											return (
												<div
													key={index}
													className="list-group"
												>
													<div className="list-base ui">
														<div className="state">
															{item.confirmTime &&
															item.confirmTime
																.length > 0
																? "Success"
																: "Pending"}
														</div>
														<div className="f1">
															Txid:{item.tx}
														</div>
														<div className="time">
															{getLocalTime(
																item.createTime
															)}
														</div>
														<div className="order">
															{address ==
															item.from
																? "-"
																: "+"}
															{info &&
																info.decimals &&
																Number(
																	Number(
																		item.value /
																			Math.pow(
																				10,
																				info.decimals
																			)
																	).toFixed(4)
																)}
															{(!info ||
																!info.decimals) &&
																Number(
																	Number(
																		item.value
																	).toFixed(4)
																)}{" "}
															{info && info.name}
														</div>
														<div
															onClick={this.showMoreClick.bind(
																this,
																index
															)}
															className={
																item.isShowMore
																	? "arrow"
																	: "arrow close"
															}
														/>
													</div>
													<div
														className={
															item.isShowMore
																? "list-more"
																: "list-more close"
														}
													>
														<div className="more-item">
															From:{item.from}
														</div>
														<div className="more-item">
															To:{item.to}
														</div>
														<div className="more-item">
															Memo:{item.remark}
														</div>
													</div>
													{/* <div className="confirm-line">
														<div className="confirm-inline" />
													</div> */}
												</div>
											);
										})}

									{flag == "eth" &&
										orderList &&
										orderList.list &&
										orderList.list.length > 0 &&
										orderList.list.map((item, index) => {
											return (
												<div
													key={index}
													className="list-group"
												>
													<div className="list-base ui">
														<div className="state">
															{item.confirm_at &&
															item.confirm_at
																.length > 0
																? "Success"
																: "Pending"}
														</div>
														<div className="f1">
															Txid:{item.hash}
														</div>
														<div className="time">
															{getLocalTime(
																item.created_at
															)}
														</div>
														<div className="order">
															{address ==
															item.pay_address
																? "-"
																: "+"}
															{Number(
																Number(
																	getEthNum(
																		item.fee
																	)
																).toFixed(4)
															)}{" "}
															{info && info.name}
														</div>
														<div
															onClick={this.showMoreClick.bind(
																this,
																index
															)}
															className={
																item.isShowMore
																	? "arrow"
																	: "arrow close"
															}
														/>
													</div>
													<div
														className={
															item.isShowMore
																? "list-more"
																: "list-more close"
														}
													>
														<div className="more-item">
															From:{
																item.pay_address
															}
														</div>
														<div className="more-item">
															To:{
																item.receive_address
															}
														</div>
														<div className="more-item">
															Memo:{item.remark}
														</div>
													</div>
													{/* <div className="confirm-line">
														<div className="confirm-inline" />
													</div> */}
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
