import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import { I18n } from "react-i18next";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box transationdetail">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content transation-content">
								<div className="transation-title">
									Transaction Details
								</div>
								<div className="transation-box">
									<div className="number">
										<span className="t1">+30000</span>
										<span className="t2">(TNC)</span>
									</div>
									<div className="detail-item">
										<div className="item-name">From:</div>
										<div className="item-detail">22</div>
									</div>
									<div className="detail-item">
										<div className="item-name">To:</div>
										<div className="item-detail">22</div>
									</div>
									<div className="detail-item">
										<div className="item-name">
											Time of Transaction:
										</div>
										<div className="item-detail">22</div>
									</div>
									<div className="detail-item">
										<div className="item-name">Memo:</div>
										<div className="item-detail">22</div>
									</div>
									<div className="detail-item">
										<div className="item-name">
											Transaction Details:
										</div>
										<div className="item-detail">22</div>
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
