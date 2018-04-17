import React, { PureComponent } from "react";
import { BigNumber } from "bignumber.js";
import { I18n } from "react-i18next";
import PerfectScrollbar from "perfect-scrollbar";
import { getQuery } from "../../../../utils/util";
import ConfirmPassword from "../../../../components/confirmpassword";
import QRCode from "../../../../assets/js/qcode";
import { Select, Slider } from "antd";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import ethicon from "#/ethicon.png";
import seticon from "#/setting.png";
const Option = Select.Option;
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			selectKey: 0,
			sendAddress: "",
			sendAmount: "",
			isShowPass: false,
			limit: "",
			most: "",
			gasNum: "",
			backList: [],
			isLoaded: false
		};
		this.myScroll = null;
		this.sendTime = 0;
		this.timer = null;
	}
	async componentWillMount() {
		let q = getQuery(window.location.href);
		let obj = JSON.parse(localStorage.getItem("walletObject"));
		if (q && q.id) {
			this.props.setEthWalletInfo(obj[q.id]);
			let s = await this.props.getEthWalletConversion({
				id: q.id
			});
			let a = await this.props.getEthConversion({
				ids: `[${q.id}]`
			});
		}
		this.commitLimit();
		this.commitMost();
		let res = await this.props.getEthGas();
		if (res.code === 4000) {
			this.changeGastoNum(res.data.gasPrice);
		}
		let backUp = localStorage.getItem("backUp");

		this.setState({
			backList: backUp ? JSON.parse(backUp) : [],
			isLoaded: true
		});
	}
	async componentDidMount() {
		this.myScroll = new PerfectScrollbar("#coinlist");
		// setTimeout(() => {
		// 	this.myScroll = new PerfectScrollbar("#coinlist");
		// }, 3000);
	}
	componentWillUnmount() {
		this.setState({
			isLoaded: false
		});
		this.myScroll = null;
	}
	changeGastoNum(num) {
		let n10 = (
			parseInt(Number(num), 10) *
			90000 /
			Math.pow(10, 18)
		).toFixed(8);
		this.setState({
			gasNum: this.isNorMal(n10)
		});
	}
	isNorMal(num) {
		let r = num;
		if (num < this.state.limit) {
			r = this.state.limit;
		}
		if (num > this.state.most) {
			r = this.state.most;
		}
		return r;
	}
	setCopy() {
		clipboard.writeText(this.props.ethWalletDetailInfo.address);
		Msg.prompt(i18n.t("success.copySucess", this.props.lng));
	}
	setPrint() {
		ipc.send("print-preview", {
			str: this.props.ethWalletDetailInfo.address,
			title: this.props.ethWalletDetailInfo.name
		});
	}
	setQcode(str) {
		setTimeout(() => {
			var box = document.getElementById("qrcode");
			box.className = "qcode show";
			box.innerHTML = "";
			var n = box.offsetWidth - 60;
			var qrcode = new QRCode(box, {
				width: n, //设置宽高
				height: n
			});
			qrcode.makeCode(str);
		}, 10);
	}
	navCur(idx) {
		return idx === this.state.type ? "nav-item cur" : "nav-item";
	}
	changeNav(idx) {
		this.setState({
			type: idx
		});
		if (idx == 1) {
			setTimeout(() => {
				this.myScroll = new PerfectScrollbar("#coinlist");
			}, 20);
		} else {
			this.myScroll.destroy();
		}
		if (idx === 3) {
			this.setQcode(this.props.ethWalletDetailInfo.address);
		}
	}
	addAsset(info) {
		console.log(info);
		if (info) {
			toHref(
				`addasset?walletid=${info.id}&&wallettype=${info.category.id}`
			);
		}
	}
	sliderChange(res) {
		this.setState({
			gasNum: this.getNumFromDec(res)
		});
	}
	getFormatter() {
		return this.state.gasNum;
	}
	selectChange(res) {
		this.setState({
			selectKey: res
		});
	}
	inputChange(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	async sendClick() {
		let key = this.state.selectKey;
		// let params = {};
		// params.wallet_id = this.props.ethWalletConversion.record.id;
		// params.flag = "eth";
		if (this.sendTime != 0) {
			Msg.prompt(i18n.t("error.ethfrequently", this.props.lng));
			return;
		}
		if (this.state.sendAddress.length <= 0) {
			Msg.prompt(i18n.t("error.addressEmpty", this.props.lng));
			return;
		}
		if (this.state.sendAmount.length <= 0) {
			Msg.prompt(i18n.t("error.amountEmpty", this.props.lng));
			return;
		}
		if (key == 0) {
			//params.asset_id = "0x0000000000000000000000000000000000000000";
			if (
				this.state.sendAmount +
					this.state.gasNum -
					getEthNum(this.props.ethConversion.list[0].balance) >
				0
			) {
				Msg.prompt(i18n.t("error.amountError", this.props.lng));
				return;
			}
		}
		if (key > 0) {
			// params.asset_id = this.props.ethWalletConversion.list[
			// 	key - 1
			// ].gnt_category.address;
			if (
				this.state.sendAmount -
					getEthNum(
						this.props.ethWalletConversion.list[key - 1].balance,
						this.props.ethWalletConversion.list[key - 1].decimals
					) >
				0
			) {
				Msg.prompt(i18n.t("error.amountError", this.props.lng));
				return;
			}
			if (
				this.state.gasNum -
					getEthNum(
						this.props.ethConversion.list[0].balance,
						this.props.ethConversion.list[0].decimals
					) >
				0
			) {
				Msg.prompt(i18n.t("error.MiningError", this.props.lng));
				return;
			}
		}
		// if (
		// 	window.walletState.checkItem(this.props.neoWalletDetailInfo.address)
		// ) {

		// 	Msg.prompt(i18n.t("error.isSend", this.props.lng));
		// 	return;
		// }
		this.setState({ isShowPass: true });
	}
	sendTimeRun() {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.sendTime--;
			if (this.sendTime > 0) {
				this.sendTimeRun();
			}
		}, 1000);
	}
	async confirmPass(res) {
		let { selectKey, sendAddress, sendAmount, gasNum } = this.state;
		let {
			ethWalletDetailInfo,
			ethWalletConversion,
			ethConversion
		} = this.props;
		let params = {};
		let n = await this.props.getEthNonce({
			address: ethWalletDetailInfo.address
		});
		params.Wallet = ethWalletDetailInfo.address;
		params.To = sendAddress;
		params.Password = res;
		let gaspri = "0x" + (gasNum * Math.pow(10, 18) / 90000).toString(16);
		params.GasPrice =
			gaspri.indexOf(".") == -1 ? gaspri : gaspri.split(".")[0];
		params.GasLimits = "0x" + Number(90000).toString(16);
		if (n.code === 4000 && n.data) {
			params.Nonce = n.data.count;
		}
		if (selectKey == 0) {
			params.Asset = "0x0000000000000000000000000000000000000000";
			params.Amount = "0x" + (sendAmount * Math.pow(10, 18)).toString(16);
		}

		if (selectKey > 0) {
			let dec = ethWalletConversion.list[selectKey - 1].decimals;
			params.Asset =
				ethWalletConversion.list[selectKey - 1].gnt_category.address;
			params.Amount =
				"0x" + (sendAmount * Math.pow(10, dec)).toString(16);
		}
		params.Amount =
			params.Amount.indexOf(".") == -1
				? params.Amount
				: params.Amount.split(".")[0];

		let load = Msg.load(i18n.t("transfrom", this.props.lng));
		try {
			let l = await this.props.setEthOrder(params);
			if (l.length > 0) {
				let res = await this.props.createOrder({
					wallet_id: ethWalletDetailInfo.id,
					data: l,
					pay_address: ethWalletDetailInfo.address,
					receive_address: sendAddress,
					remark: "",
					fee: params.Amount,
					handle_fee: params.GasPrice,
					flag: "eth",
					asset_id: params.Asset
				});
				if (res.code === 4000) {
					window.walletState.addItem({
						txid: res.data.tx,
						flag: "ETH",
						wallet_id: ethWalletDetailInfo.id,
						asset_id: params.Asset,
						from: res.data.from,
						to: res.data.to
					});
					Msg.prompt(
						i18n.t("success.transferSuccess", this.props.lng)
					);
					setTimeout(() => {
						this.goOrderList(this.state.selectKey);
					}, 2000);
				}
			}
			load.hide();
			this.setState({ isShowPass: false, password: res });
		} catch (e) {
			load.hide();
		}
		this.sendTime = 60;
		this.sendTimeRun();
	}
	closePasss() {
		this.setState({
			isShowPass: false
		});
	}
	commitLimit() {
		let l = (25200000000000 * 90000 / 21000 / Math.pow(10, 18)).toFixed(8);
		this.setState({
			limit: l
		});
	}
	commitMost() {
		let m = (2520120000000000 * 90000 / 21000 / Math.pow(10, 18)).toFixed(
			8
		);
		this.setState({
			most: m
		});
	}
	getDecFromNum(num) {
		let l = this.state.limit;
		let m = this.state.most;
		let t = m - l;
		let r = (num - l) / t;
		return r * 100;
	}
	getNumFromDec(dec) {
		let l = this.state.limit;
		let m = this.state.most;
		let t = m - l;
		let r = Number(t * (dec / 100)) + Number(l);
		return r.toFixed(8);
	}
	getCommonMoney() {
		let {
			lng,
			ethWalletDetailInfo,
			ethWalletConversion,
			ethConversion
		} = this.props;

		let num = new BigNumber(0);
		if (ethConversion && ethConversion.list && ethConversion.list[0]) {
			let i = ethConversion.list[0];
			num = new BigNumber(
				getShowMoney(
					getEthNum(i.balance),
					i.category && i.category.cap
						? lng == "en"
							? i.category.cap.price_usd
							: i.category.cap.price_cny
						: 0
				)
			);
		}
		if (
			ethWalletConversion &&
			ethWalletConversion.list &&
			ethWalletConversion.list.length > 0
		) {
			ethWalletConversion.list.map((item, index) => {
				num = num.plus(
					new BigNumber(
						getShowMoney(
							getEthNum(item.balance, item.decimals),
							item.gnt_category && item.gnt_category.cap
								? lng == "en"
									? item.gnt_category.cap.price_usd
									: item.gnt_category.cap.price_cny
								: 0
						)
					)
				);
			});
		}
		let r = getNumberString(num) + "";
		return r.substring(0, r.lastIndexOf(".") + 3);
	}
	goOrderList(key) {
		let {
			lng,
			ethWalletDetailInfo,
			ethWalletConversion,
			ethConversion
		} = this.props;
		let asset_id = "",
			name = "",
			number = "",
			price_cny = "",
			price_usd = "",
			decimals = null,
			img = "";
		if (key == 0 && ethWalletDetailInfo) {
			asset_id = "0x0000000000000000000000000000000000000000";
			img = ethWalletDetailInfo.category.img;
			name = ethWalletDetailInfo.category.name;
			number = getEthNum(
				ethConversion.list &&
					ethConversion.list[0] &&
					ethConversion.list[0].balance
			);
			price_cny =
				ethConversion.list[0].category &&
				ethConversion.list[0].category.cap
					? ethConversion.list[0].category.cap.price_cny
					: 0;
			price_usd =
				ethConversion.list[0].category &&
				ethConversion.list[0].category.cap
					? ethConversion.list[0].category.cap.price_usd
					: 0;
		}
		if (
			key > 0 &&
			ethWalletConversion &&
			ethWalletConversion.list &&
			ethWalletConversion.list.length > 0
		) {
			let item = ethWalletConversion.list[key - 1];
			asset_id = item.gnt_category.address;
			img = item.gnt_category.icon;
			name = item.gnt_category.name;
			number = getEthNum(item.balance, item.decimals);
			decimals = item.decimals;
			price_cny = item.gnt_category.cap
				? item.gnt_category.cap.price_cny
				: 0;
			price_usd = item.gnt_category.cap
				? item.gnt_category.cap.price_usd
				: 0;
		}
		let time = new Date().getTime();
		let p = {
			name: name,
			number: number,
			price_cny: price_cny,
			price_usd: price_usd,
			img: img,
			decimals: decimals ? decimals : null
		};
		localStorage.setItem(`orderlist_${time}`, JSON.stringify(p));
		toHref(
			"orderlist",
			`wallet_id=${
				ethWalletDetailInfo.id
			}&flag=eth&asset_id=${asset_id}&address=${
				ethWalletDetailInfo.address
			}&timetamp=orderlist_${time}`
		);
	}
	async deleteCoin(item, e) {
		e.stopPropagation();
		let del = await this.props.deleteCoin({
			id: item.id
		});
		if (del.code != 4000) {
			Msg.prompt(i18n.t("error.delete", this.props.lng));
		}
	}
	goManage() {
		let { ethWalletDetailInfo } = this.props;
		toHref(
			`managewallet?id=${ethWalletDetailInfo.id}&address=${
				ethWalletDetailInfo.address
			}&name=${ethWalletDetailInfo.name}`
		);
	}
	render() {
		let {
			lng,
			ethWalletDetailInfo,
			ethWalletConversion,
			ethConversion
		} = this.props;
		let {
			type,
			selectKey,
			sendAddress,
			sendAmount,
			minNumber,
			isShowPass,
			limit,
			most,
			gasNum,
			backList,
			isLoaded
		} = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="wallet">
									<div className="box1 ui center">
										<div className="icon-box">
											<img
												className="icon"
												src={ethicon}
											/>
											<img
												className="icon2"
												src={seticon}
												onClick={this.goManage.bind(
													this
												)}
											/>
										</div>
										<div className="f1">
											<div className="name">
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.name}
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.address &&
													backList &&
													backList.length > 0 &&
													backList.indexOf(
														ethWalletDetailInfo.address
													) == -1 && (
														<span className="backup">
															{t("unbackup", lng)}
														</span>
													)}
											</div>
											<div className="address">
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.address}
											</div>
										</div>
										<div className="money">
											{lng == "en" ? "$" : "￥"}
											{`${this.getCommonMoney()}`}
										</div>
									</div>
									<div className="box2 ui center">
										<div className="navbox f1">
											<div
												onClick={this.changeNav.bind(
													this,
													1
												)}
												className={this.navCur.bind(
													this,
													1
												)()}
											>
												{t("walletDetail.asset", lng)}
											</div>
											<div
												onClick={this.changeNav.bind(
													this,
													2
												)}
												className={this.navCur.bind(
													this,
													2
												)()}
											>
												{t("walletDetail.send", lng)}
											</div>
											<div
												onClick={this.changeNav.bind(
													this,
													3
												)}
												className={this.navCur.bind(
													this,
													3
												)()}
											>
												{t("walletDetail.receive", lng)}
											</div>
											{/* <div
												onClick={this.changeNav.bind(
													this,
													4
												)}
												className={this.navCur.bind(
													this,
													4
												)()}
											>
												Record
											</div> */}
										</div>
										<div
											className="box-btn button-blue"
											onClick={this.addAsset.bind(
												this,
												ethWalletDetailInfo
											)}
										>
											{t("walletDetail.addAsset", lng)}
										</div>
									</div>
									{type === 1 && (
										<div className="box3" id="coinlist">
											<div className="wallet-out">
												<div
													className="wallet-item ui center"
													onClick={this.goOrderList.bind(
														this,
														0
													)}
												>
													<img
														className="icon"
														src={
															ethConversion &&
															ethConversion.list &&
															ethConversion
																.list[0] &&
															ethConversion
																.list[0]
																.category &&
															ethConversion
																.list[0]
																.category.img
														}
													/>
													<div className="f1 name">
														{ethConversion &&
															ethConversion.list &&
															ethConversion
																.list[0] &&
															ethConversion
																.list[0]
																.category &&
															ethConversion
																.list[0]
																.category.name}
													</div>
													<div
														style={{
															textAlign: "right"
														}}
													>
														<div className="t1">
															{ethConversion &&
																ethConversion.list &&
																ethConversion
																	.list[0] && (
																	<span>
																		{getEthNum(
																			ethConversion
																				.list[0]
																				.balance
																		)}
																	</span>
																)}
														</div>
														<div className="t1">
															{lng == "en"
																? "$"
																: "￥"}
															{ethConversion &&
																ethConversion.list &&
																ethConversion
																	.list[0] && (
																	<span>
																		{getShowMoney(
																			getEthNum(
																				ethConversion
																					.list[0]
																					.balance
																			),
																			ethConversion
																				.list[0]
																				.category &&
																			ethConversion
																				.list[0]
																				.category
																				.cap
																				? lng ==
																				  "en"
																					? ethConversion
																							.list[0]
																							.category
																							.cap
																							.price_usd
																					: ethConversion
																							.list[0]
																							.category
																							.cap
																							.price_cny
																				: 0
																		)}
																	</span>
																)}
														</div>
													</div>
												</div>
											</div>
											{isLoaded &&
												ethWalletConversion &&
												ethWalletConversion.list &&
												ethWalletConversion.list
													.length > 0 &&
												ethWalletConversion.list.map(
													(item, index) => {
														return (
															<div
																className="wallet-out"
																key={index}
															>
																<div
																	className="wallet-item ui center"
																	onClick={this.goOrderList.bind(
																		this,
																		index +
																			1
																	)}
																>
																	<img
																		className="icon"
																		src={
																			item.gnt_category &&
																			item
																				.gnt_category
																				.icon
																		}
																	/>
																	<div className="f1 name">
																		{
																			item.name
																		}
																		<span
																			onClick={this.deleteCoin.bind(
																				this,
																				item
																			)}
																			className="delete"
																		/>
																	</div>
																	<div
																		style={{
																			textAlign:
																				"right"
																		}}
																	>
																		<div className="t1">
																			{getEthNum(
																				item.balance,
																				item.decimals
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}{" "}
																			{getShowMoney(
																				getEthNum(
																					item.balance
																				),
																				lng ==
																				"en"
																					? item.gnt_category &&
																					  item
																							.gnt_category
																							.cap &&
																					  item
																							.gnt_category
																							.cap
																							.price_usd
																					: item.gnt_category &&
																					  item
																							.gnt_category
																							.cap &&
																					  item
																							.gnt_category
																							.cap
																							.price_cny
																			)}
																		</div>
																	</div>
																</div>
															</div>
														);
													}
												)}
										</div>
									)}
									{type === 2 && (
										<div className="box4">
											<div className="send-item">
												<div className="send-name">
													{t(
														"walletDetail.sendTitle",
														lng
													)}
												</div>
												<div className="input-box">
													<input
														type="text"
														className="input"
														value={sendAddress}
														onChange={this.inputChange.bind(
															this,
															"sendAddress"
														)}
													/>
												</div>
											</div>
											<div className="send-item">
												<div className="send-name ui">
													<div className="f1">
														{t(
															"walletDetail.amount",
															lng
														)}
													</div>
													<div className="t1">
														{t(
															"walletDetail.available",
															lng
														)}：
														{selectKey == 0 &&
															ethConversion &&
															ethConversion.list &&
															ethConversion
																.list[0] && (
																<span>
																	{getEthNum(
																		ethConversion
																			.list[0]
																			.balance
																	)}
																</span>
															)}
														{selectKey > 0 &&
															ethWalletConversion &&
															ethWalletConversion.list &&
															ethWalletConversion
																.list[
																selectKey - 1
															] && (
																<span>
																	{getEthNum(
																		ethWalletConversion
																			.list[
																			selectKey -
																				1
																		]
																			.balance,
																		ethWalletConversion
																			.list[
																			selectKey -
																				1
																		]
																			.decimals
																	)}
																</span>
															)}
														{selectKey == 0 &&
															(ethWalletConversion &&
																ethWalletConversion.record &&
																ethWalletConversion
																	.record
																	.category &&
																ethWalletConversion
																	.record
																	.category
																	.name)}
														{selectKey > 0 && (
															<span>
																{ethWalletConversion &&
																	ethWalletConversion.list &&
																	ethWalletConversion
																		.list[
																		selectKey -
																			1
																	] &&
																	ethWalletConversion
																		.list[
																		selectKey -
																			1
																	].name}
															</span>
														)}
													</div>
												</div>
												<div className="ui input-box">
													<input
														type="text"
														className="input input2"
														value={sendAmount}
														onChange={this.inputChange.bind(
															this,
															"sendAmount"
														)}
													/>
													<div className="select-box">
														<Select
															defaultValue={0}
															style={{
																width: 120,
																height: 60
															}}
															onChange={this.selectChange.bind(
																this
															)}
														>
															{ethWalletConversion &&
																ethWalletConversion.record &&
																ethWalletConversion
																	.record
																	.category && (
																	<Option
																		value={
																			0
																		}
																	>
																		{
																			ethWalletConversion
																				.record
																				.category
																				.name
																		}
																	</Option>
																)}

															{ethWalletConversion &&
																ethWalletConversion.list &&
																ethWalletConversion
																	.list
																	.length >
																	0 &&
																ethWalletConversion.list.map(
																	(
																		item,
																		index
																	) => {
																		return (
																			<Option
																				key={
																					index
																				}
																				value={
																					index +
																					1
																				}
																			>
																				{
																					item.name
																				}
																			</Option>
																		);
																	}
																)}
														</Select>
													</div>
												</div>
											</div>
											<div className="send-item">
												<div className="send-name ui">
													<div className="f1">
														{t(
															"walletDetail.miniFee",
															lng
														)}
													</div>
													<div className="t2">
														{gasNum} ETH
													</div>
												</div>
												<div className="ui center slideritem">
													<div>
														{t(
															"walletDetail.slow",
															lng
														)}
													</div>
													<div
														className="f1 sliderbox"
														style={{
															WebkitAppRegion:
																"no-drag"
														}}
													>
														<Slider
															onChange={this.sliderChange.bind(
																this
															)}
															value={this.getDecFromNum(
																gasNum
															)}
															tipFormatter={this.getFormatter.bind(
																this
															)}
														/>
													</div>
													<div>
														{t(
															"walletDetail.quick",
															lng
														)}
													</div>
												</div>
											</div>
											<div className="btn-box">
												<span
													className="button-green"
													onClick={this.sendClick.bind(
														this
													)}
												>
													{t(
														"walletDetail.send",
														lng
													)}
												</span>
											</div>
										</div>
									)}
									{type === 3 && (
										<div className="box5">
											<div className="receive-title">
												{t(
													"walletDetail.reviceTitleEth",
													lng
												)}
											</div>
											<div className="qcodebox">
												<div
													className="qcode"
													id="qrcode"
												/>
											</div>
											<div className="btn-box">
												<span
													className="button-green"
													onClick={this.setCopy.bind(
														this
													)}
												>
													<i className="icon-copy" />
													<span className="t">
														{t(
															"walletDetail.copy",
															lng
														)}
													</span>
												</span>
												<span
													className="button-green"
													onClick={this.setPrint.bind(
														this
													)}
												>
													<i className="icon-print" />
													<span className="t">
														{t(
															"walletDetail.print",
															lng
														)}
													</span>
												</span>
											</div>
										</div>
									)}
									{/* {type === 4 && (
										<div className="box6">
											<div className="record-item ui center">
												<img
													className="record-icon"
													src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4274948427,2487433404&fm=173&s=03B35C8544C8A74540915D910300A089&w=218&h=146&img.JPEG"
												/>
												<div className="record-address f1">
													22
												</div>
												<div className="record-num">
													222
												</div>
											</div>
										</div>
									)} */}
								</div>
							</div>
							{isShowPass && (
								<ConfirmPassword
									lng={lng}
									close={this.closePasss.bind(this)}
									confirm={this.confirmPass.bind(this)}
								/>
							)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
