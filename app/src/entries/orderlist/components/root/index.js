import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery, getLocalTime } from "../../../../utils/util";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
import searchimg from "#/search_ico.png";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: null,
			wallet_id: null,
			asset_id: null,
			address: null,
			name: null
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		let set = {};
		if (q.wallet_id) {
			set.wallet_id = q.wallet_id;
		}
		if (q.flag) {
			set.flag = q.flag;
		}
		if (q.asset_id) {
			set.asset_id = q.asset_id;
		}
		if (q.address) {
			set.address = q.address;
		}
		if (q.name) {
			set.name = q.name;
		}
		if (q.wallet_id && q.flag && q.asset_id) {
			this.props.getOrderList({
				flag: q.flag,
				wallet_id: q.wallet_id,
				asset_id: q.asset_id
			});
		}
		this.setState(set);
	}
	showMoreClick(idx) {
		this.props.changeShow(idx);
	}
	render() {
		let { lng, orderList } = this.props;
		let { flag, name, address } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box projectlist">
						<Menu curmenu="project" />
						<div className="content-container">
							<HeaderNav />
							<div className="content orderlist">
								<div className="info">
									<div className="t1">
										<img
											className="img"
											src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3407680589,3409634802&fm=173&app=25&f=JPEG?w=218&h=146&s=0F9068854A1824C2DCA9950B0300F091"
											alt=""
										/>
										<span>NEO</span>
										<span>(NEO)</span>
									</div>
									<div className="t2">
										<span>sdas</span>
										<span className="t3">222</span>
									</div>
								</div>
								<div className="list-box">
									{flag == "neo" &&
										orderList &&
										orderList.list &&
										orderList.list.length > 0 &&
										orderList.list.map((item, index) => {
											return (
												<div
													key={index}
													className="list-group"
												>
													<div className="list-base ui">
														<div className="state">
															{item.confirmTime &&
																item.confirmTime
																	.length >
																	0 &&
																"Success"}
														</div>
														<div className="f1">
															Txid:{item.tx}
														</div>
														<div className="time">
															{getLocalTime(
																item.createTime
															)}
														</div>
														<div className="order">
															{address ==
															item.from
																? "-"
																: "+"}
															{item.value} {name}
														</div>
														<div
															onClick={this.showMoreClick.bind(
																this,
																index
															)}
															className={
																item.isShowMore
																	? "arrow"
																	: "arrow close"
															}
														/>
													</div>
													<div
														className={
															item.isShowMore
																? "list-more"
																: "list-more close"
														}
													>
														<div className="more-item">
															From:{item.from}
														</div>
														<div className="more-item">
															To:{item.to}
														</div>
														<div className="more-item">
															Memo:
														</div>
													</div>
													<div className="confirm-line">
														<div className="confirm-inline" />
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
