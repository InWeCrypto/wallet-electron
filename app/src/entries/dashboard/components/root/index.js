import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
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
		this.state = {};
		this.boxScorll = null;
		this.itemScorll = null;
	}
	componentDidMount() {
		this.boxScorll = new PerfectScrollbar("#assetsBox");
		this.itemScorll = new PerfectScrollbar(".assets-list");
	}
	componentWillUnmount() {
		this.boxScorll = null;
		this.itemScorll = null;
	}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box dashboard-main">
						<Menu curmenu="dashboard" lng={lng} />
						<div className="content-container">
							<div className="content project-content">
								<div className="title">My DashBoard</div>
								<div className="ctrl-box ui center">
									<div className="ctrl-item totle">
										<div className="txt1">#EA660E</div>
										<div className="txt2">
											Total Balance
										</div>
									</div>
									<div className="ctrl-item eth">
										<div className="txt1">
											ETH {lng == "en" ? "$" : "￥"}
											2321321
										</div>
										<div className="button-blue btn">
											Add Assets
										</div>
									</div>
									<div className="ctrl-item neo">
										<div className="txt1">
											NEO {lng == "en" ? "$" : "￥"}
											2321321
										</div>
										<div className="button-green2 btn">
											Add Assets
										</div>
									</div>
								</div>
								<div className="middle-title ui">
									<div className="f1">All Assets</div>
									<div className="hide-ctrl">
										<i className="check-icon" />
										<span>Hide small balance</span>
									</div>
								</div>
								<div className="assets-box" id="assetsBox">
									<div className="assets-item">
										<div className="assets-face">
											<div className="coin-img">
												<img
													className="trans3s"
													src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524650505282&di=ec9c75dc9fd3f640c38476e4f047cf15&imgtype=0&src=http%3A%2F%2Fp1.sinaimg.cn%2F6013688672%2F180%2F52011473921579"
												/>
											</div>
											<div className="coin-name">NEO</div>
											<div className="coin-number trans3s">
												222.00
											</div>
											<div className="line" />
											<div className="item-ctrl ui">
												<i className="ctrl tran-icon" />
												<div className="f1">
													<i className="ctrl qcode-icon" />
												</div>
												<i className="ctrl package-icon" />
											</div>
										</div>
										<div className="assets-list trans3s">
											<div className="assets-wallet trans3s">
												<div className="wallet-name">
													wallet
												</div>
												<div className="wallet-number">
													200000
												</div>
												<div className="line" />
											</div>
										</div>
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
