import React, { PureComponent } from "react";
import { getquery, getQuery } from "../../../../utils/util";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import imgico from "#/tishi_ico.png";
import { toHref } from "../../../../utils/util.js";

import "./index.less";
import { link } from "fs";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isfirstPage: true,
			chooseArray: [],
			showArr: [],
			waitChoose: [],
			address: ""
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.address) {
			this.setState({
				address: q.address,
				name: q.name,
				password: q.pass
			});
			this.setState({
				address: q.address
			});
			this.props
				.getWalletInfo({
					address: q.address,
					pass: q.pass,
					lang: this.props.lng == "en" ? "en_US" : "zh_CN"
				})
				.then(res => {
					if (res.length > 0) {
						this.setState({
							showArr: res,
							waitChoose: this.shuffle(
								JSON.parse(JSON.stringify(res))
							)
						});
					}
				});
		}
	}
	chooseItem(idx) {
		let list = JSON.parse(JSON.stringify(this.state.chooseArray));
		let arr = JSON.parse(JSON.stringify(this.state.waitChoose));
		let newa = arr.splice(idx, 1);
		this.setState({
			waitChoose: [...arr],
			chooseArray: [...list, ...newa]
		});
	}
	//下一步
	nextPage() {
		this.setState({
			isfirstPage: false
		});
	}
	localMember(address) {
		let local = localStorage.getItem("memoList");
		if (!local || local.length <= 0) {
			local = [];
		} else {
			local = JSON.parse(local);
		}
		if (local.indexOf(address) == -1) {
			local.push(address);
			localStorage.setItem("memoList", JSON.stringify(local));
		}
	}
	confirmClick() {
		let c = this.state.chooseArray;
		let a = this.props.walletInfo;
		let address = this.state.address;
		if (JSON.stringify(a) == JSON.stringify(c)) {
			Msg.prompt(i18n.t("success.valiSuccess", this.props.lng));
			setBackUp(this.state.address);
			this.localMember(address);
			setTimeout(() => {
				toHref("wallet");
			}, 2000);
		} else {
			Msg.prompt(i18n.t("error.valiError", this.props.lng));
			this.setState({
				chooseArray: []
			});
		}
	}
	removeChoose(idx) {
		let arr = JSON.parse(JSON.stringify(this.state.chooseArray));
		let waitChoose = this.state.waitChoose;
		let newa = arr.splice(idx, 1);
		this.setState({
			chooseArray: arr,
			waitChoose: [...waitChoose, ...newa]
		});
	}
	shuffle(input) {
		const length = input.length;
		let index;
		for (let i = length - 1; i; i--) {
			index = Math.floor(Math.random() * i);
			input[i] = input.splice(index, 1, input[i])[0];
		}
		return input;
	}
	backClick() {
		let { isfirstPage } = this.state;
		if (!isfirstPage) {
			this.setState({
				isfirstPage: true
			});
		} else {
			this.props.history.go(-1);
		}
	}
	render() {
		let { lng, walletInfo } = this.props;
		let { isfirstPage, chooseArray, showArr, waitChoose } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box mnemonic mnemonic1">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav
								back={this.backClick.bind(this)}
								history={this.props.history}
							/>
							<div className="content mnemonic-content">
								<div className="title">
									{t("backupMnemonic.title", lng)}
								</div>
								<div className="cokBox">
									{isfirstPage && (
										<div className="titleImg">
											<img className="img" src={imgico} />
										</div>
									)}
									{isfirstPage && (
										<div className="showWordBox">
											<ul className="wordUl">
												{walletInfo &&
													walletInfo.length > 0 &&
													walletInfo.map(
														(val, idx) => {
															return (
																<li
																	key={idx}
																	className="word"
																>
																	{val}
																</li>
															);
														}
													)}
											</ul>
										</div>
									)}
									{!isfirstPage && (
										<div className="showWordBox">
											<ul className="wordUl">
												{chooseArray &&
													chooseArray.map(
														(val, idx) => {
															return (
																<li
																	key={idx}
																	className="word"
																	onClick={this.removeChoose.bind(
																		this,
																		idx
																	)}
																>
																	{val}
																</li>
															);
														}
													)}
											</ul>
										</div>
									)}

									{isfirstPage ? (
										<div className="boxq1">
											<p className="mess">
												{t("backupMnemonic.step1", lng)}
											</p>
											<p className="mess">
												{t("backupMnemonic.step2", lng)}
											</p>
											<p className="mess">
												{t("backupMnemonic.step3", lng)}
											</p>
											<button
												className="next"
												onClick={this.nextPage.bind(
													this
												)}
											>
												{t("backupMnemonic.next", lng)}
											</button>
										</div>
									) : (
										<div className="boxq2">
											<div className="q2title">
												{t(
													"backupMnemonic.waitChoose",
													lng
												)}
											</div>
											<ul className="helpList">
												{waitChoose &&
													waitChoose.map(
														(val, idx) => {
															return (
																<li
																	key={idx}
																	className="helpWord"
																	onClick={this.chooseItem.bind(
																		this,
																		idx
																	)}
																>
																	{val}
																</li>
															);
														}
													)}
											</ul>
											<button
												className="next"
												onClick={this.confirmClick.bind(
													this
												)}
											>
												{t(
													"backupMnemonic.confirm",
													lng
												)}
											</button>
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
