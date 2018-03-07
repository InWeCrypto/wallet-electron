import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
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
			minNumber: 0
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let obj = JSON.parse(localStorage.getItem("walletObject"));
		if (q && q.id) {
			this.props.setEthWalletInfo(obj[q.id]);
			// this.props.getWalletAssets({
			// 	wallet_id: q.id,
			// 	wallet_category_id: 2
			// }); d
			this.props.getEthWalletConversion({
				id: q.id
			});
			this.props.getEthConversion({
				ids: `[${q.id}]`
			});
		}
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
		if (info.list && info.list[0]) {
			toHref(
				`addasset?walletid=${info.list[0].id}&&wallettype=${
					info.list[0].category.id
				}`
			);
		}
	}
	sliderChange(res) {
		this.setState({
			minNumber: res
		});
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
			minNumber
		} = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content">
								<div className="wallet">
									<div className="box1 ui center">
										<img
											className="icon"
											src={
												ethWalletDetailInfo &&
												ethWalletDetailInfo.list &&
												ethWalletDetailInfo.list[0] &&
												ethWalletDetailInfo.list[0]
													.category &&
												ethWalletDetailInfo.list[0]
													.category.img
											}
										/>
										<div className="f1">
											<div className="name">
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.list &&
													ethWalletDetailInfo
														.list[0] &&
													ethWalletDetailInfo.list[0]
														.name}
											</div>
											<div className="address">
												{ethWalletDetailInfo &&
													ethWalletDetailInfo.list &&
													ethWalletDetailInfo
														.list[0] &&
													ethWalletDetailInfo.list[0]
														.address}
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
											<div
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
											</div>
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
											<div className="wallet-item ui center">
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
													<div className="t1">2</div>
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
														Available：10.0000
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
														0.000029384 ETH
													</div>
												</div>
												<div className="ui center slideritem">
													<div>Slow</div>
													<div className="f1 sliderbox">
														<Slider
															onChange={this.sliderChange.bind(
																this
															)}
															defaultValue={
																minNumber
															}
														/>
													</div>
													<div>Quick</div>
												</div>
											</div>
											<div className="btn-box">
												<span className="button-green">
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
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
