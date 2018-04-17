import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { Decimal } from "decimal.js";
import PerfectScrollbar from "perfect-scrollbar";
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
			flag: null,
			wallet_id: null,
			asset_id: null,
			address: null,
			info: null,
			page: 1,
			isGetting: false
		};
		this.timer = null;
		this.myScroll = null;
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
			set.asset_id =
				q.flag == "neo" ? q.asset_id : q.asset_id.toLowerCase();
		}
		if (q.address) {
			set.address = q.address;
		}
		if (q.timetamp) {
			set.info = JSON.parse(localStorage.getItem(`${q.timetamp}`));
		}
		if (q.wallet_id && q.flag && q.asset_id) {
			this.rePageLoad(set);
		}
		this.setState(set);
		let box = document.querySelector("#listBox");
		this.myScroll = new PerfectScrollbar(box, {
			wheelSpeed: 2,
			wheelPropagation: true,
			suppressScrollX: true
		});
		box.addEventListener(
			"ps-scroll-down",
			() => {
				if (
					this.myScroll.reach.y == "end" &&
					this.props.orderList.list.length >= 20
				) {
					this.getPageData();
				}
			},
			false
		);
		this.props.getMinBlock();
		this.props.getBlockSecond();
	}
	componentWillUnmount() {
		this.myScroll.destroy();
		clearTimeout(this.timer);
		this.props.clearList();
	}
	async rePageLoad(obj) {
		let q = obj ? obj : this.state;
		clearTimeout(this.timer);
		let l = obj
			? 20
			: this.props.orderList && this.props.orderList.list
				? this.props.orderList.list.length
				: 20;
		let res = await this.props.getStartOrderList({
			flag: q.flag,
			wallet_id: q.wallet_id,
			asset_id: q.asset_id,
			size: l,
			page: 1
		});
		if (q.flag == "eth") {
			let s = await this.props.getBlockNumber();
		}
		this.myScroll.update();
		this.timer = setTimeout(() => {
			this.rePageLoad();
		}, this.props.blockSecond ? this.props.blockSecond.bps : 30000);
	}
	async getPageData() {
		let box = document.querySelector("#listBox");
		let st = box.scrollTop;
		let h = box.offsetHeight;
		let sh = box.scrollHeight;
		let res = await this.props.getOrderList({
			flag: this.state.flag,
			wallet_id: this.state.wallet_id,
			asset_id: this.state.asset_id,
			size: 20,
			page: this.state.page + 1
		});
		this.myScroll.update();
		if (res.code === 4000) {
			this.setState({
				page: this.state.page + 1
			});
		}
	}
	getStateEth(item) {
		let itemB = item.block_number;
		let confirmAt = item.confirm_at;
		let curB = this.props.currentBlockNumber
			? this.props.currentBlockNumber.value
			: 0;

		let minB = this.props.minBlock ? this.props.minBlock.min_block_num : 0;

		let stateB = itemB + minB - curB;

		if (stateB < 0 && (!confirmAt || confirmAt.length <= 0)) {
			return "fail";
		}
		if (stateB <= 0 && confirmAt && confirmAt.length > 0) {
			return "success";
		}
		if (stateB > 0 && stateB < minB) {
			return minB - stateB;
		}
	}
	openEthTxid(item) {
		let isDev = localStorage.getItem("isDev");
		let tx =
			item.trade_no.indexOf("0x") != -1
				? item.trade_no
				: "0x" + item.trade_no;
		if (isDev && JSON.parse(isDev)) {
			shell.openExternal(`https://ropsten.etherscan.io/tx/${tx}`);
		} else {
			shell.openExternal(`https://etherscan.io/tx/${tx}`);
		}
	}
	openNeoTxid(item) {
		let isDev = localStorage.getItem("isDev");
		let tx =
			item.tx.indexOf("0x") == -1 ? item.tx : item.tx.replace(/^0x/, "");
		if (isDev && JSON.parse(isDev)) {
			shell.openExternal(`https://neoscan-testnet.io/transaction/${tx}`);
		} else {
			shell.openExternal(`https://neoscan.io/transaction/${tx}`);
		}
	}
	showMoreClick(idx) {
		this.props.changeShow(idx);
	}
	render() {
		let { lng, orderList, minBlock } = this.props;
		let { flag, info, address } = this.state;
		if (
			flag == "eth" &&
			orderList &&
			orderList.list &&
			orderList.list.length > 0
		) {
			orderList.list.map((item, index) => {
				item.state = this.getStateEth(item);
				item.percent = null;
				if (item.state == "fail") {
					item.stateText = i18n.t("orderList.fail", lng);
					return;
				}
				if (item.state == "success") {
					item.stateText = i18n.t("orderList.success", lng);
					return;
				}
				item.stateText = i18n.t("orderList.pending", lng);
				item.percent =
					(item.state ? item.state : 0) /
						(minBlock ? minBlock.min_block_num : 0) *
						100 +
					"%";
				return;
			});
		}
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box projectlist">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
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
													{getNumberString(
														info.number
													)}
												</span>
											)}

										<span className="t3">
											({lng == "en" ? "$" : "￥"}
											{info &&
												getShowMoney(
													info.number,
													lng == "en"
														? info.price_usd
														: info.price_cny
												)})
										</span>
									</div>
								</div>
								<div className="list-box" id="listBox">
									<div>
										{flag == "neo" &&
											orderList &&
											orderList.list &&
											orderList.list.length > 0 &&
											orderList.list.map(
												(item, index) => {
													return (
														<div
															key={index}
															className={(item => {
																return item.isShowMore
																	? "list-group show"
																	: "list-group";
															})(item)}
														>
															<div className="list-base ui">
																<div className="state">
																	{item.confirmTime &&
																	item
																		.confirmTime
																		.length >
																		0
																		? t(
																				"orderList.success",
																				lng
																		  )
																		: t(
																				"orderList.pending",
																				lng
																		  )}
																</div>
																<div
																	className="f1 txid"
																	onClick={this.openNeoTxid.bind(
																		this,
																		item
																	)}
																>
																	{t(
																		"orderList.txid",
																		lng
																	)}:{item.tx}
																</div>
																<div className="time">
																	{getLocalTime(
																		item.createTime
																	)}
																</div>
																<div className="order">
																	{}
																	{address ==
																		item.from &&
																	address ==
																		item.to
																		? ""
																		: address ==
																		  item.from
																			? "-"
																			: "+"}
																	{info &&
																		info.decimals &&
																		getNumberString(
																			Number(
																				item.value /
																					Math.pow(
																						10,
																						info.decimals
																					)
																			).toFixed(
																				8
																			)
																		)}
																	{(!info ||
																		!info.decimals) &&
																		getNumberString(
																			Number(
																				Number(
																					item.value
																				).toFixed(
																					8
																				)
																			)
																		)}{" "}
																	{info &&
																		info.name}
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
																	{t(
																		"orderList.from",
																		lng
																	)}:{
																		item.from
																	}
																</div>
																<div className="more-item">
																	{t(
																		"orderList.to",
																		lng
																	)}:{item.to}
																</div>
																<div className="more-item">
																	{t(
																		"orderList.memo",
																		lng
																	)}:{
																		item.remark
																	}
																</div>
															</div>
															{/* <div className="line1" /> */}
														</div>
													);
												}
											)}
										{flag == "eth" &&
											orderList &&
											orderList.list &&
											orderList.list.length > 0 &&
											orderList.list.map(
												(item, index) => {
													return (
														<div
															key={index}
															className={(item => {
																return item.isShowMore
																	? "list-group show"
																	: "list-group";
															})(item)}
														>
															<div className="list-base ui">
																<div className="state">
																	{
																		item.stateText
																	}
																	{item.percent !=
																		null && (
																		<span>
																			&nbsp;({item.state
																				? item.state
																				: 0}/{minBlock &&
																				minBlock.min_block_num})
																		</span>
																	)}
																</div>
																<div
																	className="f1 txid"
																	onClick={this.openEthTxid.bind(
																		this,
																		item
																	)}
																>
																	{t(
																		"orderList.txid",
																		lng
																	)}:{
																		item.hash
																	}
																</div>
																<div className="time">
																	{getLocalTime(
																		item.created_at
																	)}
																</div>
																<div className="order">
																	{item.pay_address ==
																	item.receive_address
																		? ""
																		: address.toLowerCase() ==
																		  item.pay_address.toLowerCase()
																			? "-"
																			: "+"}
																	{getEthNum(
																		item.fee,
																		info
																			? info.decimals
																			: null
																	)}{" "}
																	{info &&
																		info.name}
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
																	{t(
																		"orderList.from",
																		lng
																	)}:{
																		item.pay_address
																	}
																</div>
																<div className="more-item">
																	{t(
																		"orderList.to",
																		lng
																	)}:{
																		item.receive_address
																	}
																</div>
																<div className="more-item">
																	{t(
																		"orderList.memo",
																		lng
																	)}:{
																		item.remark
																	}
																</div>
															</div>
															{item.percent && (
																<div className="confirm-line">
																	<div
																		style={{
																			width:
																				item.percent
																		}}
																		className="confirm-inline"
																	/>
																</div>
															)}
															{/* <div className="line1" /> */}
														</div>
													);
												}
											)}
									</div>
									{(!orderList ||
										!orderList.list ||
										orderList.list.length <= 0) && (
										<div
											style={{
												textAlign: "center",
												padding: ".2rem 0",
												fontSize: "16px",
												colro: "#53536B"
											}}
										>
											{t("error.nodata", lng)}
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
