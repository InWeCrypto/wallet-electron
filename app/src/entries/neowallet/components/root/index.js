import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { Select } from "antd";
import { getQuery, toHref } from "../../../../utils/util";
import QRCode from "../../../../assets/js/qcode";
import ConfirmPassword from "../../../../components/confirmpassword";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import neoicon from "#/neoicon.png";
import seticon from "#/setting.png";
const Option = Select.Option;
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 1,
			sendAddress: "",
			sendAmount: "",
			sendKey: 0,
			isShowPass: false,
			password: "",
			backList: []
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
			this.props.getNeoWalletConversion({ id: q.id });
		}
		let backUp = localStorage.getItem("backUp");
		this.setState({
			backList: backUp ? JSON.parse(backUp) : []
		});
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
		this.setState({ type: idx });
		if (idx === 3) {
			this.setQcode(this.props.neoWalletDetailInfo.address);
		}
	}
	addAsset(info) {
		toHref(`addasset?walletid=${info.id}&&wallettype=${info.category.id}`);
	}
	sendAddress(e) {
		this.setState({ sendAddress: e.target.value });
	}
	sendAmount(e) {
		this.setState({ sendAmount: e.target.value });
	}
	sendKeyChange(e) {
		this.setState({ sendKey: e });
	}
	async sendClick() {
		let key = this.state.sendKey;
		var params = {};
		params.wallet_id = this.props.neoWalletDetailInfo.id;
		params.flag = "NEO";
		let arr = [];
		if (this.state.sendAmount <= 0) {
			Msg.prompt(i18n.t("error.amountZero", this.props.lng));
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
			if (
				this.state.sendAmount -
					this.props.neoConversion.record.balance >
				0
			) {
				Msg.prompt(i18n.t("error.amountError", this.props.lng));
				return;
			}
		}
		if (key == 1) {
			if (
				this.state.sendAmount -
					this.props.neoConversion.record.gnt[0].balance >
				0
			) {
				Msg.prompt(i18n.t("error.amountError", this.props.lng));
				return;
			}
		}
		if (
			key > 1 &&
			this.props.neoConversion.list &&
			this.props.neoConversion.list[key - 2] &&
			this.props.neoConversion.list[key - 2].gnt_category
		) {
			// params.asset_id = this.props.neoConversion.list[
			// 	key - 2
			// ].gnt_category.address;
			let curcoin = await this.props.getAssetsOrderList({
				...params,
				asset_id: this.props.neoConversion.list[key - 2].gnt_category
					.address
			});
			if (
				curcoin.code === 4000 &&
				curcoin.data &&
				curcoin.data.list &&
				curcoin.data.list.length > 0
			) {
				arr.concat(curcoin.data.list);
			}
			if (
				this.state.sendAmount -
					getNumFromStr(
						this.props.neoConversion.list[key - 2].balance,
						this.props.neoConversion.list[key - 2].decimals
					) >
				0
			) {
				Msg.prompt(i18n.t("error.amountError", this.props.lng));
				return;
			}
		}
		//判断当前app是否有正在转账的订单
		if (
			window.walletState.checkItem(this.props.neoWalletDetailInfo.address)
		) {
			Msg.prompt(i18n.t("error.isSend", this.props.lng));
			return;
		}
		//params.asset_id ="0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
		//params.asset_id ="0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
		let neo = await this.props.getAssetsOrderList({
			...params,
			asset_id:
				"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"
		});

		let isSending = false;
		if (
			neo.code === 4000 &&
			neo.data &&
			neo.data.list &&
			neo.data.list.length > 0
		) {
			arr.concat(neo.data.list);
		}
		let gas = await this.props.getAssetsOrderList({
			...params,
			asset_id:
				"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7"
		});
		if (
			gas.code === 4000 &&
			gas.data &&
			gas.data.list &&
			gas.data.list.length > 0
		) {
			arr.concat(gas.data.list);
		}
		if (arr.length > 0) {
			if (!item.confirmTime || item.confirmTime.length <= 0) {
				isSending = true;
			}
		}
		if (!isSending) {
			this.setState({ isShowPass: true });
		} else {
			Msg.prompt(i18n.t("error.isSend", this.props.lng));
		}
	}
	closePasss() {
		this.setState({ isShowPass: false });
	}
	async confirmPass(res) {
		this.setState({ isShowPass: false, password: res });
		let {
			neoWalletDetailInfo,
			neoConversion,
			neoUtxo,
			gasUtxo
		} = this.props;
		let { sendKey, sendAmount, sendAddress } = this.state;
		let params = {};
		params.Wallet = neoWalletDetailInfo.address;
		let address = neoWalletDetailInfo.address;
		params.To = this.state.sendAddress;
		params.Amount =
			"0x" + (this.state.sendAmount * Math.pow(10, 8)).toString(16);
		params.Password = res;
		params.Gas = "0x" + 0 + "0";
		let fee = sendAmount;
		if (sendKey === 0) {
			params.Asset =
				"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
			let res = await this.props.getNeoUtxo({
				address: address,
				type: "neo-asset-id"
			});

			if (res.code === 4000 && res.data && res.data.result) {
				params.Unspent = JSON.stringify(res.data.result);
			}
		}
		if (sendKey === 1) {
			params.Asset =
				"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
			let res = await this.props.getNeoUtxo({
				address: address,
				type: "neo-gas-asset-id"
			});
			if (res.code === 4000 && res.data && res.data.result) {
				params.Unspent = JSON.stringify(res.data.result);
			}
		}
		if (
			sendKey > 1 &&
			neoConversion &&
			neoConversion.list &&
			neoConversion.list.length > 0
		) {
			params.Asset = neoConversion.list[sendKey - 2].gnt_category.address;
			params.Amount =
				"0x0" +
				(
					this.state.sendAmount *
					Math.pow(10, neoConversion.list[sendKey - 2].decimals)
				).toString(16);
			fee = parseInt(
				sendAmount *
					Math.pow(10, neoConversion.list[sendKey - 2].decimals)
			);
			let n = await this.props.getNeoUtxo({
				address: address,
				type: "neo-asset-id"
			});

			let g = await this.props.getNeoUtxo({
				address: address,
				type: "neo-gas-asset-id"
			});
			if (n.code === 4000 && g.code === 4000 && n.data && g.data) {
				params.Unspent = JSON.stringify([
					...n.data.result,
					...g.data.result
				]);
			} else {
				return;
			}
		}
		if (params.Amount.indexOf(".") != -1) {
			params.Amount = params.Amount.split(".")[0];
		}
		let l = await this.props.sendNeoOrader(params);
		if (l && l.data && l.txid) {
			let order = await this.props.createOrder({
				wallet_id: neoWalletDetailInfo.id,
				data: l.data,
				trade_no: l.txid.indexOf("0x") == -1 ? "0x" + l.txid : l.txid,
				pay_address: neoWalletDetailInfo.address,
				receive_address: sendAddress,
				remark: "",
				fee: fee + "",
				handle_fee: "0",
				flag: "NEO",
				asset_id: params.Asset
			});
			if (order && order.code === 4000) {
				window.walletState.addItem({
					txid: order.data.tx,
					flag: "NEO",
					wallet_id: neoWalletDetailInfo.id,
					asset_id: params.Asset,
					from: order.data.from,
					to: order.data.to
				});
				Msg.prompt(i18n.t("success.transferSuccess", this.props.lng));
			}
		}
	}
	getCommonMoney() {
		let num = 0;
		let {
			lng,
			neoWalletDetailInfo,
			neoWalletAssets,
			neoConversion
		} = this.props;
		if (neoConversion && neoConversion.record) {
			let r = neoConversion.record;
			num += new Number(
				r.balance *
					(r.cap
						? lng == "en" ? r.cap.price_usd : r.cap.price_cny
						: 0)
			);
		}
		if (
			neoConversion &&
			neoConversion.record &&
			neoConversion.record.gnt &&
			neoConversion.record.gnt.length > 0
		) {
			neoConversion.record.gnt.map((item, index) => {
				num += new Number(
					item.balance *
						(item.cap
							? lng == "en"
								? item.cap.price_usd
								: item.cap.price_cny
							: 0)
				);
			});
		}
		if (
			neoConversion &&
			neoConversion.list &&
			neoConversion.list.length > 0
		) {
			neoConversion.list.map((item, index) => {
				num += new Number(
					getNumFromStr(item.balance, item.decimals) *
						(item.gnt_category && item.gnt_category.cap
							? lng == "en"
								? item.gnt_category.cap.price_usd
								: item.gnt_category.cap.price_cny
							: 0)
				);
			});
		}
		return (parseInt(num * 10 * 10) / 10 / 10).toFixed(2);
	}
	goOrderList(key) {
		let { neoWalletDetailInfo, neoConversion } = this.props;
		let asset_id = "",
			name = "",
			number = "",
			price_cny = "",
			price_usd = "",
			img = "",
			decimals = null;
		if (key == 0) {
			asset_id =
				"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
			name = "NEO";
			number = neoConversion.record.balance;
			img = neoConversion.record.category.img;
			price_cny = neoConversion.record.cap
				? neoConversion.record.cap.price_cny
				: 0;
			price_usd = neoConversion.record.cap
				? neoConversion.record.cap.price_usd
				: 0;
		}
		if (key == 1) {
			asset_id =
				"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
			name = "GAS";
			img = neoConversion.record.category.img;
			number = neoConversion.record.gnt[0].balance;
			price_cny = neoConversion.record.gnt[0].cap
				? neoConversion.record.gnt[0].cap.price_cny
				: 0;
			price_usd = neoConversion.record.gnt[0].cap
				? neoConversion.record.gnt[0].cap.price_usd
				: 0;
		}
		if (key > 1 && neoConversion && neoConversion.list) {
			asset_id = neoConversion.list[key - 2].gnt_category.address;
			name = neoConversion.list[key - 2].gnt_category.name;
			img = neoConversion.list[key - 2].gnt_category.icon;
			number = getNumFromStr(
				neoConversion.list[key - 2].balance,
				neoConversion.list[key - 2].decimals
			);
			price_cny = neoConversion.list[key - 2].gnt_category.cap
				? neoConversion.list[key - 2].gnt_category.cap.price_cny
				: 0;
			price_usd = neoConversion.list[key - 2].gnt_category.cap
				? neoConversion.list[key - 2].gnt_category.cap.price_usd
				: 0;
			decimals = neoConversion.list[key - 2].decimals;
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
		toHref(
			"orderlist",
			`wallet_id=${
				neoWalletDetailInfo.id
			}&flag=neo&asset_id=${asset_id}&address=${
				neoWalletDetailInfo.address
			}&timetamp=orderlist_${time}`
		);
	}
	goGas() {
		toHref("gas", `walletid=${this.props.neoWalletDetailInfo.id}`);
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
		let { neoWalletDetailInfo } = this.props;
		toHref(
			`managewallet?id=${neoWalletDetailInfo.id}&address=${
				neoWalletDetailInfo.address
			}&name=${neoWalletDetailInfo.name}`
		);
	}
	render() {
		let {
			lng,
			neoWalletDetailInfo,
			neoWalletAssets,
			neoConversion,
			walletOrderList
		} = this.props;
		let {
			type,
			sendAddress,
			sendAmount,
			sendKey,
			isShowPass,
			backList
		} = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content">
								<div className="wallet neowallet">
									<div className="box1 ui center">
										<div className="icon-box">
											<img
												className="icon"
												src={neoicon}
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
												{neoWalletDetailInfo &&
													neoWalletDetailInfo.name}
												{neoWalletDetailInfo &&
												neoWalletDetailInfo.address &&
												backList &&
												backList.length > 0 &&
												backList.indexOf(
													neoWalletDetailInfo.address
												) == -1 ? (
													<span className="backup">
														{t("unbackup", lng)}
													</span>
												) : (
													""
												)}
											</div>
											<div className="address">
												{neoWalletDetailInfo &&
													neoWalletDetailInfo.address}
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
											className="box-btn gas"
											onClick={this.goGas.bind(this)}
										>
											<div className="t1">
												{t("walletDetail.claim", lng)}
											</div>
											<div className="t2">
												{neoConversion &&
													neoConversion.record &&
													neoConversion.record.gnt &&
													neoConversion.record
														.gnt[0] &&
													neoConversion.record.gnt[0]
														.available &&
													Number(
														Number(
															neoConversion.record
																.gnt[0]
																.available
														).toFixed(8)
													)}GAS
											</div>
										</div>
										<div
											onClick={this.addAsset.bind(
												this,
												neoWalletDetailInfo
											)}
											className="box-btn"
										>
											{t("walletDetail.addAsset", lng)}
										</div>
									</div>
									{type === 1 && (
										<div className="box3">
											<div className="wallet-out">
												<div
													onClick={this.goOrderList.bind(
														this,
														0
													)}
													className="wallet-item ui center"
												>
													<img
														className="icon"
														src={
															neoConversion &&
															neoConversion.record &&
															neoConversion.record
																.category &&
															neoConversion.record
																.category.img
														}
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
																	{Number(
																		Number(
																			neoConversion
																				.record
																				.balance
																		).toFixed(
																			8
																		)
																	)}
																</div>
															)}
														{neoConversion &&
															neoConversion.record &&
															neoConversion.record
																.cap &&
															neoConversion.record
																.cap
																.price_usd && (
																<div className="t1">
																	{lng == "en"
																		? "$"
																		: "￥"}{" "}
																	{neoConversion
																		.record
																		.balance ==
																	0
																		? "0"
																		: (
																				neoConversion
																					.record
																					.balance *
																				(lng ==
																				"en"
																					? neoConversion
																							.record
																							.cap
																							.price_usd
																					: neoConversion
																							.record
																							.cap
																							.price_cny)
																		  ).toFixed(
																				2
																		  )}
																</div>
															)}
													</div>
												</div>
											</div>
											<div className="wallet-out">
												<div
													className="wallet-item ui center"
													onClick={this.goOrderList.bind(
														this,
														1
													)}
												>
													<img
														className="icon"
														src={
															neoConversion &&
															neoConversion.record &&
															neoConversion.record
																.category &&
															neoConversion.record
																.category.img
														}
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
																	{Number(
																		Number(
																			neoConversion
																				.record
																				.gnt[0]
																				.balance
																		).toFixed(
																			8
																		)
																	)}
																</div>
															)}

														{neoConversion &&
															neoConversion.record &&
															neoConversion.record
																.cap &&
															neoConversion.record
																.gnt &&
															neoConversion.record
																.gnt[0] &&
															neoConversion.record
																.gnt[0].cap &&
															neoConversion.record
																.gnt[0].cap
																.price_usd && (
																<div className="t1">
																	{lng == "en"
																		? "$"
																		: "￥"}{" "}
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
																				(lng ==
																				"en"
																					? neoConversion
																							.record
																							.gnt[0]
																							.cap
																							.price_usd
																					: neoConversion
																							.record
																							.gnt[0]
																							.cap
																							.price_cny)
																		  ).toFixed(
																				2
																		  )}
																</div>
															)}
													</div>
												</div>
											</div>

											{neoConversion &&
												neoConversion.list &&
												neoConversion.list.length > 0 &&
												neoConversion.list.map(
													(item, index) => {
														return (
															<div
																className="wallet-out"
																key={index}
															>
																<div
																	onClick={this.goOrderList.bind(
																		this,
																		index +
																			2
																	)}
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
																		{
																			item.name
																		}
																		<span
																			onClick={this.deleteCoin.bind(
																				this,
																				item
																			)}
																			className="delete"
																		>
																			{t(
																				"delete.delete",
																				lng
																			)}
																		</span>
																	</div>
																	<div
																		style={{
																			textAlign:
																				"right"
																		}}
																	>
																		<div className="t1">
																			{Number(
																				(
																					getNumFromStr(
																						item.balance
																					) /
																					Math.pow(
																						10,
																						item.decimals
																					)
																				).toFixed(
																					8
																				)
																			)}
																		</div>
																		<div className="t1">
																			{lng ==
																			"en"
																				? "$"
																				: "￥"}{" "}
																			{(
																				getNumFromStr(
																					item.balance
																				) /
																				Math.pow(
																					10,
																					item.decimals
																				) *
																				(lng ==
																				"en"
																					? item
																							.gnt_category
																							.cap &&
																					  item
																							.gnt_category
																							.cap
																							.price_usd
																					: item
																							.gnt_category
																							.cap &&
																					  item
																							.gnt_category
																							.cap
																							.price_cny)
																			).toFixed(
																				2
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
														onChange={this.sendAddress.bind(
															this
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
														)}：{" "}
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
																{getNumFromStr(
																	neoConversion
																		.list[
																		sendKey -
																			2
																	].balance
																) == 0
																	? "0"
																	: getNumFromStr(
																			neoConversion
																				.list[
																				sendKey -
																					2
																			]
																				.balance
																	  ) /
																	  Math.pow(
																			10,
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
														type="number"
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
													"walletDetail.reviceTitleNeo",
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
						</div>
						{isShowPass && (
							<ConfirmPassword
								lng={lng}
								close={this.closePasss.bind(this)}
								confirm={this.confirmPass.bind(this)}
							/>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
