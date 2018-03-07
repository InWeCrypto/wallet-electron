import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery, getEthNum } from "../../../../utils/util";
import QRCode from "../../../../assets/js/qcode";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			walletType: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let obj = JSON.parse(localStorage.getItem("walletObject"));
		if (q.id && obj[q.id]) {
			this.props.setInfo(obj[q.id]);
			this.props.getConversion({
				ids: `[${q.id}]`
			});
			this.props.getWalletList({
				id: q.id
			});
			if (obj[q.id].category_id == 1) {
				this.setState({
					walletType: 1
				});
			}
			if (obj[q.id].category_id == 2) {
				this.setState({
					walletType: 2
				});
			}
		}
	}
	navCur(idx) {
		return idx === this.state.type ? "nav-item cur" : "nav-item";
	}
	changeNav(idx) {
		this.setState({
			type: idx
		});
		if (idx === 2) {
			this.setQcode(this.props.watchInfo.address);
		}
	}
	setCopy() {
		clipboard.writeText(this.props.watchInfo.address);
		Msg.prompt("copy success");
	}
	setPrint() {
		ipc.send("print-preview", {
			str: this.props.watchInfo.address,
			title: this.props.watchInfo.name
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
	render() {
		let { lng, watchInfo, watchConver, walletList } = this.props;
		let { type, walletType } = this.state;

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
												watchInfo &&
												watchInfo.category &&
												watchInfo.category.img
											}
										/>
										<div className="f1">
											<div className="name">
												<span>
													{watchInfo &&
														watchInfo.name}
												</span>
												<span className="watch">
													watch
												</span>
											</div>
											<div className="address">
												{watchInfo && watchInfo.address}
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
												Receive
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
												Record
											</div>
										</div>
										<div className="box-btn disabled">
											<div className="t1">Claim</div>
											<div className="t2">2000.00GAS</div>
										</div>
										<div className="box-btn line-orange">
											Add Asset
										</div>
									</div>
									{type === 1 &&
										walletType == 1 && (
											<div className="box3">
												{watchConver &&
													watchConver.list &&
													watchConver.list[0] && (
														<div className="wallet-item ui center">
															<img
																className="icon"
																src={
																	watchConver
																		.list[0]
																		.category &&
																	watchConver
																		.list[0]
																		.category
																		.img
																}
															/>
															<div className="f1 name">
																{watchConver
																	.list[0]
																	.category &&
																	watchConver
																		.list[0]
																		.category
																		.name}
															</div>
															<div
																style={{
																	textAlign:
																		"right"
																}}
															>
																<div className="t1">
																	{getEthNum(
																		watchConver
																			.list[0]
																			.balance
																	)}
																</div>
																<div className="t1">
																	{lng == "en"
																		? "$"
																		: "￥"}
																	{(
																		getEthNum(
																			watchConver
																				.list[0]
																				.balance
																		) *
																		(watchConver
																			.list[0]
																			.category &&
																		watchConver
																			.list[0]
																			.category
																			.cap
																			? lng ==
																				"en"
																				? watchConver
																						.list[0]
																						.category
																						.cap
																						.price_usd
																				: watchConver
																						.list[0]
																						.category
																						.cap
																						.price_cny
																			: 0)
																	).toFixed(
																		4
																	)}
																</div>
															</div>
														</div>
													)}
												<div className="wallet-item ui center">
													<img
														className="icon"
														src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=703596290,1200042368&fm=173&s=05105F955E20468E2A8D7D610300E0F0&w=218&h=146&img.JPEG"
													/>
													<div className="f1 name">
														22
													</div>
													<div
														style={{
															textAlign: "right"
														}}
													>
														<div className="t1">
															2
														</div>
														<div className="t1">
															2
														</div>
													</div>
												</div>
											</div>
										)}
									{type === 1 &&
										walletType == 2 && (
											<div className="box3">
												{watchConver &&
													watchConver.list &&
													watchConver.list[0] && (
														<div className="wallet-item ui center">
															<img
																className="icon"
																src={
																	watchConver
																		.list[0]
																		.category &&
																	watchConver
																		.list[0]
																		.category
																		.img
																}
															/>
															<div className="f1 name">
																{watchConver
																	.list[0]
																	.category &&
																	watchConver
																		.list[0]
																		.category
																		.name}
															</div>
															<div
																style={{
																	textAlign:
																		"right"
																}}
															>
																<div className="t1">
																	{
																		watchConver
																			.list[0]
																			.balance
																	}
																</div>
																<div className="t1">
																	{lng == "en"
																		? "$"
																		: "￥"}
																	{(
																		watchConver
																			.list[0]
																			.balance *
																		(watchConver
																			.list[0]
																			.category &&
																		watchConver
																			.list[0]
																			.category
																			.cap
																			? lng ==
																				"en"
																				? watchConver
																						.list[0]
																						.category
																						.cap
																						.price_usd
																				: watchConver
																						.list[0]
																						.category
																						.cap
																						.price_cny
																			: 0)
																	).toFixed(
																		4
																	)}
																</div>
															</div>
														</div>
													)}
												{walletList &&
													walletList.record &&
													walletList.record.gnt &&
													walletList.record.gnt
														.length > 0 &&
													walletList.record.gnt.map(
														(item, index) => {
															return (
																<div
																	key={index}
																	className="wallet-item ui center"
																>
																	<img
																		className="icon"
																		src={
																			walletList
																				.record
																				.category
																				.img
																		}
																	/>
																	<div className="f1 name">
																		{
																			item.name
																		}
																	</div>
																	<div
																		style={{
																			textAlign:
																				"right"
																		}}
																	>
																		<div className="t1">
																			{new Number(
																				item.balance
																			).toFixed(
																				4
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}
																			{(
																				item.balance *
																				(item.cap
																					? lng ==
																						"en"
																						? item
																								.cap
																								.price_usd
																						: item
																								.cap
																								.price_cny
																					: 0)
																			).toFixed(
																				4
																			)}
																		</div>
																	</div>
																</div>
															);
														}
													)}
												{walletList &&
													walletList.list &&
													walletList.list.length >
														0 &&
													walletList.list.map(
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
																		{item.gnt_category &&
																			item
																				.gnt_category
																				.name}
																	</div>
																	<div
																		style={{
																			textAlign:
																				"right"
																		}}
																	>
																		<div className="t1">
																			{getNumFromStr(
																				item.balance,
																				item.decimals
																			).toFixed(
																				4
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}
																			{(
																				getNumFromStr(
																					item.balance,
																					item.decimals
																				) *
																				(item.gnt_category &&
																				item
																					.gnt_category
																					.cap
																					? lng ==
																						"en"
																						? item
																								.gnt_category
																								.cap
																								.price_usd
																						: item
																								.gnt_category
																								.cap
																								.price_cny
																					: 0)
																			).toFixed(
																				4
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
										<div className="box5">
											<div className="receive-title">
												{watchInfo &&
													watchInfo.category_id ==
														1 &&
													"Recive ETH/ERC 20 Token"}
												{watchInfo &&
													watchInfo.category_id ==
														2 &&
													"Recive NEO/NEP5 Token"}
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
									{type === 3 && (
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
