import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
import ConfirmPassword from "../../../../components/confirmpassword";
import QRCode from "../../../../assets/js/qcode";
import { Select, Slider } from "antd";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
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
			gasNum: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let obj = JSON.parse(localStorage.getItem("walletObject"));
		if (q && q.id) {
			this.props.setEthWalletInfo(obj[q.id]);
			this.props.getEthWalletConversion({
				id: q.id
			});
			this.props.getEthConversion({
				ids: `[${q.id}]`
			});
		}
		this.commitLimit();
		this.commitMost();
		this.props.getEthGas().then(res => {
			if (res.code === 4000) {
				this.changeGastoNum(res.data.gasPrice);
			}
		});
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
		Msg.prompt("copy success");
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
			box.innerHTML = "";
			var n = box.offsetWidth - 10;
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
					getEthNum(this.props.ethConversion.list[0].balance) >
				0
			) {
				Msg.prompt(i18n.t("error.MiningError", this.props.lng));
				return;
			}
		}
		this.setState({ isShowPass: true });
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
		params.GasPrice =
			"0x" + (gasNum * Math.pow(10, 18) / 90000).toString(16);
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
			// params.GasLimits = "0x0" + Number(90000).toString(16);
		}

		let l = await this.props.setEthOrder(params);
		if (l.length > 0) {
			this.props
				.createOrder({
					wallet_id: ethWalletDetailInfo.id,
					data: l,
					pay_address: ethWalletDetailInfo.address,
					receive_address: sendAddress,
					remark: "",
					fee: params.Amount,
					handle_fee: params.GasPrice,
					flag: "eth",
					asset_id: params.Asset
				})
				.then(res => {
					if (res.code === 4000) {
						Msg.prompt(
							i18n.t("success.transferSuccess", this.props.lng)
						);
					}
				});
		}
		this.setState({ isShowPass: false, password: res });
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
			img = "";
		if (key == 0 && ethWalletDetailInfo) {
			asset_id = "0x0000000000000000000000000000000000000000";
			img = ethWalletDetailInfo.category.img;
			name = ethWalletDetailInfo.category.name;
			number = getEthNum(ethConversion.list[0].balance);
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
			number = getEthNum(item.balance);
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
			img: img
		};
		sessionStorage.setItem(`orderlist_${time}`, JSON.stringify(p));
		toHref(
			"orderlist",
			`wallet_id=${
				ethWalletDetailInfo.id
			}&flag=eth&asset_id=${asset_id}&address=${
				ethWalletDetailInfo.address
			}&timetamp=orderlist_${time}`
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
			gasNum
		} = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav />
							<div className="content">
								<div className="wallet">
									<div className="box1 ui center">
										<img
											className="icon"
											src={
												ethWalletDetailInfo &&
												ethWalletDetailInfo.category &&
												ethWalletDetailInfo.category.img
											}
										/>
										<div className="f1">
											<div className="name">
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.name}
											</div>
											<div className="address">
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.address}
											</div>
										</div>
										<div className="money">$100.00</div>
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
												Asset
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
												Send
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
												Receive
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
											className="box-btn line-orange"
											onClick={this.addAsset.bind(
												this,
												ethWalletDetailInfo
											)}
										>
											Add Asset
										</div>
									</div>
									{type === 1 && (
										<div className="box3">
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
														ethConversion.list[0] &&
														ethConversion.list[0]
															.category &&
														ethConversion.list[0]
															.category.img
													}
												/>
												<div className="f1 name">
													{ethConversion &&
														ethConversion.list &&
														ethConversion.list[0] &&
														ethConversion.list[0]
															.category &&
														ethConversion.list[0]
															.category.name}
												</div>
												<div>
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
																	{(
																		getEthNum(
																			ethConversion
																				.list[0]
																				.balance
																		) *
																		(ethConversion
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
																			: 0)
																	).toFixed(
																		2
																	)}
																</span>
															)}
													</div>
												</div>
											</div>
											{ethWalletConversion &&
												ethWalletConversion.list &&
												ethWalletConversion.list
													.length > 0 &&
												ethWalletConversion.list.map(
													(item, index) => {
														return (
															<div
																key={index}
																className="wallet-item ui center"
																onClick={this.goOrderList.bind(
																	this,
																	index + 1
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
																	{item.name}
																</div>
																<div
																	style={{
																		textAlign:
																			"right"
																	}}
																>
																	<div className="t1">
																		{getEthNum(
																			item.balance
																		)}
																	</div>
																	<div className="t1">
																		{lng ==
																		"en"
																			? "$"
																			: "￥"}{" "}
																		{getEthNum(
																			item.balance
																		) *
																			(lng ==
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
																						.price_cny)}
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
													Sent to Address
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
														Amount
													</div>
													<div className="t1">
														Available：
														{selectKey == 0 &&
															ethConversion &&
															ethConversion.list &&
															ethConversion
																.list[0] &&
															getEthNum(
																ethConversion
																	.list[0]
																	.balance
															)}
														{selectKey > 0 &&
															ethWalletConversion &&
															ethWalletConversion.list &&
															ethWalletConversion
																.list[
																selectKey - 1
															] &&
															getEthNum(
																ethWalletConversion
																	.list[
																	selectKey -
																		1
																].balance
															)}
														{selectKey == 0 && (
															<span>
																{ethWalletConversion &&
																	ethWalletConversion.record &&
																	ethWalletConversion
																		.record
																		.category &&
																	ethWalletConversion
																		.record
																		.category
																		.name}
															</span>
														)}
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
														className="input"
														value={sendAmount}
														onChange={this.inputChange.bind(
															this,
															"sendAmount"
														)}
													/>
													<div>
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
														Mining Fee
													</div>
													<div className="t2">
														{gasNum} ETH
													</div>
												</div>
												<div className="ui center slideritem">
													<div>Slow</div>
													<div className="f1 sliderbox">
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
													<div>Quick</div>
												</div>
											</div>
											<div className="btn-box">
												<span
													className="button-green"
													onClick={this.sendClick.bind(
														this
													)}
												>
													Send
												</span>
											</div>
										</div>
									)}
									{type === 3 && (
										<div className="box5">
											<div className="receive-title">
												Recive ETH/ ERC 20 Token
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
														Copy Address
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
														Print Address
													</span>
												</span>
											</div>
										</div>
									)}
									{type === 4 && (
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
									)}
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
