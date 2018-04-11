import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
import searchimg from "#/search_ico.png";
import searchimg1 from "#/search_ico1.png";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			isFocus: false,
			isShowResult: false
		};
		this.keyPress = this.keyPress.bind(this);
	}
	componentDidMount() {
		this.props.getSearchHistory();
		document.addEventListener("keypress", this.keyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keypress", this.keyPress);
	}
	keyPress(e) {
		if (e.keyCode === 13 && this.state.isFocus) {
			this.getData(this.state.keyword);
		}
	}
	async getData(word) {
		if (!word || word.length <= 0) {
			this.setState({
				isShowResult: false
			});
			return;
		}
		let r = await this.props.getSearchResult({
			keywords: word
		});
		if (r.code === 4000) {
			this.setState({
				isShowResult: true
			});
		}
	}
	inputChange(e) {
		this.setState({
			keyword: e.target.value
		});
	}
	changeFocus() {
		this.setState({
			isFocus: true
		});
	}
	changeBlur() {
		this.setState({
			isFocus: false
		});
	}
	openWeb(item) {
		let isD = JSON.parse(localStorage.getItem("isDev"));
		let url = isD
			? "http://testnet.inwecrypto.com/projectdetail?c_id="
			: "http://inwecrypto.com/projectdetail?c_id=";
		ipc.send("openWeb", {
			url: `${url}${item.id}`
		});
	}
	render() {
		let { lng, searchHistory, searchResult } = this.props;
		let { keyword, isShowResult, isFocus } = this.state;
		const wh = window.screen.availHeight;
		let h = isFocus ? wh - 234 : wh - 234 - 50;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box project">
						<Menu curmenu="project" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content project-content">
								<div
									className={isFocus ? "title hide" : "title"}
								>
									{t("project.t2", lng)}
								</div>
								<div className="search-box">
									<img
										src={isFocus ? searchimg : searchimg1}
										alt=""
									/>
									<input
										type="text"
										value={keyword}
										onChange={this.inputChange.bind(this)}
										onFocus={this.changeFocus.bind(this)}
										onBlur={this.changeBlur.bind(this)}
										// placeholder={
										// 	isFocus ? "" : t("project.t2", lng)
										// }
									/>
								</div>
								{!isShowResult && (
									<div className="tags-box">
										<div className="tagsname">
											{t("project.t1", lng)}
										</div>
										<ul className="tags">
											{searchHistory &&
												searchHistory.length > 0 &&
												searchHistory.map(
													(item, index) => {
														return (
															<li
																key={index}
																className="tags-cell"
																onClick={this.getData.bind(
																	this,
																	item.name
																)}
															>
																{item.name}
															</li>
														);
													}
												)}
										</ul>
									</div>
								)}
								{isShowResult && (
									<div
										className={"search-list"}
										style={{ height: h + "px" }}
									>
										<ul className="search-list-ul">
											{searchResult &&
												searchResult.data &&
												searchResult.data.length > 0 &&
												searchResult.data.map(
													(item, idex) => {
														return (
															<li
																key={idex}
																className="search-cell"
																onClick={this.openWeb.bind(
																	this,
																	item
																)}
															>
																<div className="imgbox">
																	<img
																		src={
																			item.img
																		}
																	/>
																</div>
																<div className="messBox">
																	<div className="name">
																		{
																			item.name
																		}
																		&nbsp; ({
																			item.long_name
																		})
																	</div>
																	{item.industry &&
																		item
																			.industry
																			.length >
																			0 && (
																			<div className="mess">
																				{
																					item.industry
																				}
																			</div>
																		)}
																</div>
															</li>
														);
													}
												)}
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
