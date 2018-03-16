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
			showArr: []
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
			this.props
				.getWalletInfo({
					address: q.address,
					pass: q.pass,
					lang: this.props.lng == "en" ? "en_US" : "zh_CN"
				})
				.then(res => {
					if (res.length > 0) {
						this.setState({
							showArr: this.shuffle(res)
						});
					}
				});
		}
	}
	chooseItem(idx) {
		let list = this.state.chooseArray;
		let arr = this.props.walletInfo;
		if (arr && arr.length > 0) {
			this.setState({
				chooseArray: [...list, arr[idx]]
			});
		}
	}
	//下一步
	nextPage() {
		this.setState({
			isfirstPage: false
		});
	}
	confirmClick() {
		let c = this.state.chooseArray;
		let a = this.props.walletInfo;
		if (JSON.stringify(a) == JSON.stringify(c)) {
			Msg.prompt(i18n.t("success.valiSuccess", this.props.lng));
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
		arr.splice(idx, 1);
		this.setState({
			chooseArray: arr
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

	render() {
		let { lng, walletInfo } = this.props;
		let { isfirstPage, chooseArray, showArr } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box mnemonic mnemonic1">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
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
													chooseArray.length > 0 &&
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
												待选助记词
											</div>
											<ul className="helpList">
												{showArr &&
													showArr.length > 0 &&
													showArr.map((val, idx) => {
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
													})}
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
