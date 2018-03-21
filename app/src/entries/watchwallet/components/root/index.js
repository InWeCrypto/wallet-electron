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
	addAsset(info) {
		if (info) {
			toHref(
				`addasset?walletid=${info.id}&wallettype=${
					info.category.id
				}&isWatch=true`
			);
		}
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
	getCommonMoney() {
		let { lng, watchInfo, watchConver, walletList } = this.props;
		let num = 0;
		if (watchInfo && watchInfo.category_id == 1) {
			if (watchConver && watchConver.list[0]) {
				let d = watchConver.list[0];
				num += new Number(
					(
						getEthNum(d.balance) *
						(d.category && d.category.cap
							? lng == "en"
								? d.category.cap.price_usd
								: d.category.cap.price_cny
							: 0)
					).toFixed(4)
				);
			}
			if (walletList && walletList.list && walletList.list.length > 0) {
				walletList.list.map((item, index) => {
					num += new Number(
						(
							getEthNum(item.balance, item.decimals) *
							(item.gnt_category && item.gnt_category.cap
								? lng == "en"
									? item.gnt_category.cap.price_usd
									: item.gnt_category.cap.price_cny
								: 0)
						).toFixed(4)
					);
				});
			}
		}
		if (watchInfo && watchInfo.category_id == 2) {
			if (watchConver && watchConver.list[0]) {
				num += new Number(
					(
						watchConver.list[0].balance *
						(watchConver.list[0].category &&
						watchConver.list[0].category.cap
							? lng == "en"
								? watchConver.list[0].category.cap.price_usd
								: watchConver.list[0].category.cap.price_cny
							: 0)
					).toFixed(4)
				);
			}
			if (
				walletList &&
				walletList.record &&
				walletList.record.gnt &&
				walletList.record.gnt.length > 0
			) {
				walletList.record.gnt.map((item, index) => {
					num += new Number(
						(
							item.balance *
							(item.cap
								? lng == "en"
									? item.cap.price_usd
									: item.cap.price_cny
								: 0)
						).toFixed(4)
					);
				});
			}
			if (walletList && walletList.list && walletList.list.length > 0) {
				walletList.list.map((item, index) => {
					num += new Number(
						(
							getNumFromStr(item.balance, item.decimals) *
							(item.gnt_category && item.gnt_category.cap
								? lng == "en"
									? item.gnt_category.cap.price_usd
									: item.gnt_category.cap.price_cny
								: 0)
						).toFixed(4)
					);
				});
			}
		}

		return num.toFixed(2);
	}
	goOrderList(key) {
		let { type, walletType } = this.state;
		let { lng, watchInfo, watchConver, walletList } = this.props;
		let asset_id = "",
			name = "",
			number = "",
			price_cny = "",
			price_usd = "",
			img = "",
			decimals = null;
		if (walletType == 1) {
			if (key == 0) {
				asset_id = "0x0000000000000000000000000000000000000000";
				img = watchInfo.category.img;
				name = watchInfo.category.name;
				number = getEthNum(watchConver.list[0].balance);
				price_cny =
					watchConver.list[0].category &&
					watchConver.list[0].category.cap
						? watchConver.list[0].category.cap.price_cny
						: 0;
				price_usd =
					watchConver.list[0].category &&
					watchConver.list[0].category.cap
						? watchConver.list[0].category.cap.price_usd
						: 0;
			}
			if (
				key > 0 &&
				walletList &&
				walletList.list &&
				walletList.list.length > 0
			) {
				asset_id = walletList.list[key - 1].gnt_category.address;
				img = walletList.list[key - 1].gnt_category.icon;
				name = walletList.list[key - 1].gnt_category.name;
				number = getEthNum(walletList.list[key - 1].balance);
				price_cny =
					walletList.list[key - 1].gnt_category &&
					walletList.list[key - 1].gnt_category.cap
						? walletList.list[key - 1].gnt_category.cap.price_cny
						: 0;
				price_usd =
					walletList.list[key - 1].gnt_category &&
					walletList.list[key - 1].gnt_category.cap
						? walletList.list[key - 1].gnt_category.cap.price_usd
						: 0;
			}
		}
		if (walletType == 2) {
			if (key == 0) {
				asset_id =
					"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
				img = walletList.record.category.img;
				name = "NEO";
				number = walletList.record.balance;
				price_cny = walletList.record.cap.price_cny;
				price_usd = walletList.record.cap.price_usd;
			}
			if (key == 1) {
				asset_id =
					"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
				img = walletList.record.category.img;
				name = "GAS";
				number = walletList.record.gnt[0].balance;
				price_cny = walletList.record.gnt[0].cap.price_cny;
				price_usd = walletList.record.gnt[0].cap.price_usd;
			}
			if (key > 1) {
				let item = walletList.list[key - 2];
				asset_id = item.gnt_category.address;
				img = item.gnt_category.icon;
				name = item.gnt_category.name;
				number = getNumFromStr(item.balance, item.decimals);
				decimals = item.decimals;
			}
		}
		let time = new Date().getTime();
		let p = {
			name: name,
			number: number,
			price_cny: price_cny,
			price_usd: price_usd,
			img: img,
			decimals: decimals
		};
		sessionStorage.setItem(`orderlist_${time}`, JSON.stringify(p));
		let flag = "eth";
		if (walletType == 2) {
			flag = "neo";
		}
		if (walletType == 3) {
			flag = "btc";
		}
		toHref(
			"orderlist",
			`wallet_id=${
				watchInfo.id
			}&flag=${flag}&asset_id=${asset_id}&address=${
				watchInfo.address
			}&timetamp=orderlist_${time}`
		);
	}

	render() {
		let { lng, watchInfo, watchConver, walletList } = this.props;
		let { type, walletType } = this.state;

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
										{walletType &&
											walletType == 2 && (
												<div className="box-btn disabled">
													<div className="t1">
														Claim
													</div>
													<div className="t2">
														{walletList &&
															walletList.record &&
															walletList.record
																.gnt &&
															walletList.record
																.gnt[0] &&
															walletList.record
																.gnt[0]
																.available &&
															Number(
																Number(
																	walletList
																		.record
																		.gnt[0]
																		.available
																).toFixed(4)
															)}{" "}
														GAS
													</div>
												</div>
											)}

										<div
											className="box-btn line-orange"
											onClick={this.addAsset.bind(
												this,
												watchInfo
											)}
										>
											Add Asset
										</div>
									</div>
									{type === 1 &&
										walletType == 1 && (
											<div className="box3">
												{watchConver &&
													watchConver.list &&
													watchConver.list[0] && (
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
																		2
																	)}
																</div>
															</div>
														</div>
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
																			{getEthNum(
																				item.balance,
																				item.decimals
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}
																			{(
																				getEthNum(
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
																								.price_usd
																					: 0)
																			).toFixed(
																				2
																			)}
																		</div>
																	</div>
																</div>
															);
														}
													)}
											</div>
										)}
									{type === 1 &&
										walletType == 2 && (
											<div className="box3">
												{watchConver &&
													watchConver.list &&
													watchConver.list[0] && (
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
																	{Number(
																		(
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
																			2
																		)
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
																	onClick={this.goOrderList.bind(
																		this,
																		1
																	)}
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
																			{Number(
																				Number(
																					item.balance
																				).toFixed(
																					4
																				)
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}
																			{Number(
																				(
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
																				)
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
																	onClick={this.goOrderList.bind(
																		this,
																		index +
																			2
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
																			{Number(
																				getNumFromStr(
																					item.balance,
																					item.decimals
																				).toFixed(
																					4
																				)
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}
																			{Number(
																				(
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
																				)
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
