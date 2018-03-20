import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
import searchimg from "#/search_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			isFocus: false,
			isShowResult: false
		};
	}
	componentDidMount() {
		this.props.getSearchHistory();
		document.addEventListener("keypress", e => {
			if (e.keyCode === 13 && this.state.isFocus) {
				this.getData(this.state.keyword);
			}
		});
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
	render() {
		let { lng, searchHistory, searchResult } = this.props;
		let { keyword, isShowResult } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box project">
						<Menu curmenu="project" lng={lng} />
						<div className="content-container">
							<HeaderNav />
							<div className="content project-content">
								<div className="title Hide">
									Search the project you want to know
								</div>
								<div className="search-box">
									<img src={searchimg} alt="" />
									<input
										type="text"
										value={keyword}
										onChange={this.inputChange.bind(this)}
										onFocus={this.changeFocus.bind(this)}
										onBlur={this.changeBlur.bind(this)}
									/>
								</div>
								{!isShowResult && (
									<div className="tags-box">
										<div className="tagsname">
											Everyone in the search
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
									<div className="search-list">
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
																	<div className="mess">
																		{
																			item.desc
																		}
																	</div>
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
