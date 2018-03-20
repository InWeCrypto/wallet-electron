import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import imgico from "#/tishi_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			frozenShow: false,
			totalShow: false,
			walletid: "",
			password: "",
			passwordT: "",
			walletInfo: null
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let wallet = localStorage.getItem("walletObject");
		if (q.walletid) {
			this.props.getGasInfo({
				id: q.walletid
			});
			let walletInfo = wallet ? JSON.parse(wallet)[q.walletid] : null;

			this.setState({
				walletid: q.walletid,
				walletInfo: walletInfo
			});
		}
	}
	passChange(e) {
		this.setState({
			password: e.target.value
		});
	}
	passTChange(e) {
		this.setState({
			passwordT: e.target.value
		});
	}
	async showFrozenInp() {
		if (!this.state.frozenShow) {
			this.setState({
				frozenShow: true
			});
		}
		let { walletInfo, password } = this.state;
		if (this.state.frozenShow) {
			let params = {};
			let ass = {};
			ass.wallet_id = walletInfo.id;
			ass.flag = "neo";
			ass.asset_id =
				"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
			let asslist = await this.props.getAssetsOrderList(ass);
			if (
				asslist.code === 4000 &&
				asslist.data &&
				asslist.data.list &&
				asslist.data.list.length > 0
			) {
				let isPending = false;
				asslist.data.list.map((item, index) => {
					if (!item.confirmTime || item.confirmTime.length < 0) {
						isPending = true;
					}
				});
				if (isPending) {
					Msg.prompt(i18n.t("error.isSend", this.props.lng));
					return;
				}
			}
			params.Wallet = walletInfo.address;
			params.To = walletInfo.address;
			params.Password = password;
			params.Amount =
				"0x" +
				(
					Number(this.props.gasInfo.record.balance) * Math.pow(10, 8)
				).toString(16);
			params.Asset =
				"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
			params.Gas = "0x" + 0 + "0";
			let res = await this.props.getNeoUtxo({
				address: walletInfo.address,
				type: "neo-asset-id"
			});
			if (res.code === 4000 && res.data && res.data.result) {
				params.Unspent = JSON.stringify(res.data.result);
			}
			let l = await this.props.sendNeoOrader(params);
			let fee = this.props.gasInfo.record.balance;
			if (l && l.data && l.txid) {
				let unfree = await this.props.createGasOrder({
					wallet_id: walletInfo.id,
					data: l.data,
					trade_no:
						"0x".indexOf(l.txid) == -1 ? "0x" + l.txid : l.txid,
					pay_address: walletInfo.address,
					receive_address: walletInfo.address,
					remark: "",
					fee: fee + "",
					handle_fee: "0",
					flag: "NEO",
					asset_id: params.Asset
				});
				if (unfree && unfree.code === 4000) {
					Msg.prompt(i18n.t("success.unfreeze", this.props.lng));
					setTimeout(() => {
						window.history.back();
					}, 2000);
				}
			}
		}
	}
	async totalClaimClick() {
		if (!this.state.totalShow) {
			this.setState({
				totalShow: true
			});
			return;
		}
		let { walletInfo, passwordT } = this.state;
		let ass = {},
			params = {};

		ass.wallet_id = walletInfo.id;
		ass.flag = "neo";
		ass.asset_id =
			"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
		let asslist = await this.props.getAssetsOrderList(ass);
		if (
			asslist.code === 4000 &&
			asslist.data &&
			asslist.data.list &&
			asslist.data.list.length > 0
		) {
			let isPending = false;
			asslist.data.list.map((item, index) => {
				if (!item.confirmTime || item.confirmTime.length < 0) {
					isPending = true;
				}
			});
			if (isPending) {
				Msg.prompt(i18n.t("error.isSend", this.props.lng));
				return;
			}
		}
		params.Wallet = walletInfo.address;
		params.To = walletInfo.address;
		params.Password = passwordT;
		params.Amount =
			"0x" +
			(
				Number(this.props.gasInfo.record.gnt[0].available) *
				Math.pow(10, 8)
			).toString(16);
		params.Asset =
			"0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
		params.Gas = "0x" + 0 + "0";
		let utxo = await this.props.getGasUtxo({
			address: walletInfo.address
		});
		if (utxo && utxo.code === 4000) {
			params.Unspent = JSON.stringify(utxo.data.result.Claims);
		}
		let l = await this.props.sendGasOrder(params);
		let fee = this.props.gasInfo.record.gnt[0].available;
		if (l && l.data && l.txid) {
			let total = await this.props.createGasOrder({
				wallet_id: walletInfo.id,
				data: l.data,
				trade_no: "0x".indexOf(l.txid) == -1 ? "0x" + l.txid : l.txid,
				pay_address: walletInfo.address,
				receive_address: walletInfo.address,
				remark: "",
				fee: fee + "",
				handle_fee: "0",
				flag: "NEO",
				asset_id: params.Asset
			});
			if (total && total.code === 4000) {
				Msg.prompt(i18n.t("success.totalClaims", this.props.lng));
				setTimeout(() => {
					window.history.back();
				}, 2000);
			}
		}
	}
	render() {
		let { lng, gasInfo } = this.props;
		let { frozenShow, totalShow, password, passwordT } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box gas">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav />
							<div className="content gas-content">
								<div className="title">
									{t("gas.title", lng)}
								</div>
								<div className="cokBox">
									<div className="gasBox limit">
										<div className="gastitle">
											{t("gas.withdraw", lng)}
										</div>
										<div className="money">
											{gasInfo &&
											gasInfo.record &&
											gasInfo.record.gnt &&
											gasInfo.record.gnt[0] &&
											gasInfo.record.gnt[0].available
												? Number(
														Number(
															gasInfo.record
																.gnt[0]
																.available
														).toFixed(8)
												  )
												: 0}
										</div>
										<input
											className={
												totalShow ? "showhei" : ""
											}
											type="password"
											value={passwordT}
											placeholder={t("gas.place", lng)}
											onChange={this.passTChange.bind(
												this
											)}
										/>
										<button
											className="total"
											onClick={this.totalClaimClick.bind(
												this
											)}
										>
											{t("gas.btn1", lng)}
										</button>
									</div>
									<div
										className={
											frozenShow
												? "gasBox frozen"
												: "gasBox"
										}
									>
										<div className="gastitle">
											{t("gas.frozen", lng)}
										</div>
										<div className="money">
											{gasInfo &&
											gasInfo.record &&
											gasInfo.record.gnt &&
											gasInfo.record.gnt[0] &&
											gasInfo.record.gnt[0].unavailable
												? Number(
														gasInfo.record.gnt[0]
															.unavailable
												  ).toFixed(8)
												: 0}
										</div>

										<input
											className={
												frozenShow ? "showhei" : ""
											}
											type="password"
											value={password}
											placeholder={t("gas.place", lng)}
											onChange={this.passChange.bind(
												this
											)}
										/>

										<button
											className="total"
											onClick={this.showFrozenInp.bind(
												this
											)}
										>
											{t("gas.btn2", lng)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
