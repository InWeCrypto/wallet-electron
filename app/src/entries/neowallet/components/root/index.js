import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { Select } from "antd";
import { getQuery, toHref } from "../../../../utils/util";
import QRCode from "../../../../assets/js/qcode";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import neoicon from "#/neoicon.png";
const Option = Select.Option;
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			sendAddress: "",
			sendAmount: "",
			sendKey: 0
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let obj = JSON.parse(localStorage.getItem("walletObject"));
		if (q && q.id) {
			this.props.setNeoWalletInfo(obj[q.id]);
			this.props.getWalletAssets({
				wallet_id: q.id,
				wallet_category_id: 2
			});
			this.props.getNeoWalletConversion({
				id: q.id
			});
		}
	}
	setCopy() {
		clipboard.writeText(this.props.neoWalletDetailInfo.address);
		Msg.prompt("copy success");
	}
	setPrint() {
		ipc.send("print-preview", {
			str: this.props.neoWalletDetailInfo.address,
			title: this.props.neoWalletDetailInfo.name
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
			this.setQcode(this.props.neoWalletDetailInfo.address);
		}
	}
	addAsset(info) {
		toHref(`addasset?walletid=${info.id}&&wallettype=${info.category.id}`);
	}
	sendAddress(e) {
		this.setState({
			sendAddress: e.target.value
		});
	}
	sendAmount(e) {
		this.setState({
			sendAmount: e.target.value
		});
	}
	sendKeyChange(e) {
		console.log(e);
		this.setState({
			sendKey: e
		});
	}
	render() {
		let {
			lng,
			neoWalletDetailInfo,
			neoWalletAssets,
			neoConversion
		} = this.props;
		let { type, sendAddress, sendAmount, sendKey } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content">
								<div className="wallet neowallet">
									<div className="box1 ui center">
										<img
											className="icon"
											src={
												neoWalletDetailInfo &&
												neoWalletDetailInfo.category &&
												neoWalletDetailInfo.category.img
											}
										/>
										<div className="f1">
											<div className="name">
												{neoWalletDetailInfo &&
													neoWalletDetailInfo.name}
											</div>
											<div className="address">
												{neoWalletDetailInfo &&
													neoWalletDetailInfo.address}
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
										<div className="box-btn line-orange">
											<div className="t1">Claim</div>
											<div className="t2">2000.00GAS</div>
										</div>
										<div
											onClick={this.addAsset.bind(
												this,
												neoWalletDetailInfo
											)}
											className="box-btn line-orange"
										>
											Add Asset
										</div>
									</div>
									{type === 1 && (
										<div className="box3">
											<div className="wallet-item ui center">
												<img
													className="icon"
													src={neoicon}
												/>
												<div className="f1 name">
													NEO
												</div>
												<div
													style={{
														textAlign: "right"
													}}
												>
													{neoConversion &&
														neoConversion.record && (
															<div className="t1">
																{neoConversion
																	.record
																	.balance ==
																0
																	? "0"
																	: neoConversion
																			.record
																			.balance}
															</div>
														)}
													{neoConversion &&
														neoConversion.record && (
															<div className="t1">
																${" "}
																{neoConversion
																	.record
																	.balance ==
																0
																	? "0"
																	: (
																			neoConversion
																				.record
																				.balance *
																			neoConversion
																				.record
																				.cap
																				.price_usd
																		).toFixed(
																			8
																		)}
															</div>
														)}
												</div>
											</div>
											<div className="wallet-item ui center">
												<img
													className="icon"
													src={neoicon}
												/>
												<div className="f1 name">
													GAS
												</div>
												<div
													style={{
														textAlign: "right"
													}}
												>
													{neoConversion &&
														neoConversion.record &&
														neoConversion.record
															.gnt &&
														neoConversion.record
															.gnt[0] && (
															<div className="t1">
																{neoConversion
																	.record
																	.gnt[0]
																	.balance ==
																0
																	? "0"
																	: neoConversion
																			.record
																			.gnt[0]
																			.balance}
															</div>
														)}

													{neoConversion &&
														neoConversion.record &&
														neoConversion.record
															.gnt &&
														neoConversion.record
															.gnt[0] && (
															<div className="t1">
																${" "}
																{neoConversion
																	.record
																	.gnt[0]
																	.balance ==
																0
																	? "0"
																	: (
																			neoConversion
																				.record
																				.gnt[0]
																				.balance *
																			neoConversion
																				.record
																				.gnt[0]
																				.cap
																				.price_usd
																		).toFixed(
																			8
																		)}
															</div>
														)}
												</div>
											</div>
											{neoConversion &&
												neoConversion.list &&
												neoConversion.list.length > 0 &&
												neoConversion.list.map(
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
																		{parseInt(
																			item.balance,
																			10
																		).toFixed(
																			item.decimals
																		) == 0
																			? 0
																			: parseInt(
																					item.balance,
																					10
																				).toFixed(
																					item.decimals
																				)}
																	</div>
																	<div className="t1">
																		${" "}
																		{(
																			parseInt(
																				item.balance,
																				10
																			) *
																			item
																				.gnt_category
																				.cap
																				.price_usd
																		).toFixed(
																			item.decimals
																		)}
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
														onChange={this.sendAddress.bind(
															this
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
														{sendKey == 0 && (
															<span>
																{neoConversion &&
																neoConversion.record &&
																neoConversion
																	.record
																	.balance ==
																	0
																	? "0"
																	: neoConversion
																			.record
																			.balance}
															</span>
														)}
														{sendKey == 1 && (
															<span>
																{neoConversion &&
																neoConversion.record &&
																neoConversion
																	.record
																	.gnt &&
																neoConversion
																	.record
																	.gnt[0] &&
																neoConversion
																	.record
																	.gnt[0]
																	.balance ==
																	0
																	? "0"
																	: neoConversion
																			.record
																			.gnt[0]
																			.balance}
															</span>
														)}
														{sendKey > 1 && (
															<span>
																{parseInt(
																	neoConversion
																		.list[
																		sendKey -
																			2
																	].balance,
																	10
																) == 0
																	? "0"
																	: parseInt(
																			neoConversion
																				.list[
																				sendKey -
																					2
																			]
																				.balance,
																			10
																		).toFixed(
																			neoConversion
																				.list[
																				sendKey -
																					2
																			]
																				.decimals
																		)}
															</span>
														)}{" "}
														{sendKey == 0 && "NEO"}
														{sendKey == 1 && "GAS"}
														{sendKey > 1 &&
															neoConversion &&
															neoConversion.list[
																sendKey - 2
															].name}
													</div>
												</div>
												<div className="ui input-box">
													<input
														type="text"
														className="input"
														value={sendAmount}
														onChange={this.sendAmount.bind(
															this
														)}
													/>
													<div>
														<Select
															defaultValue={
																sendKey
															}
															style={{
																width: 120,
																height: 60
															}}
															onChange={this.sendKeyChange.bind(
																this
															)}
														>
															<Option value={0}>
																NEO
															</Option>
															<Option value={1}>
																GAS
															</Option>
															{neoConversion &&
																neoConversion.list &&
																neoConversion
																	.list
																	.length >
																	0 &&
																neoConversion.list.map(
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
																					2
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
												Recive NEP-5 Token
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
