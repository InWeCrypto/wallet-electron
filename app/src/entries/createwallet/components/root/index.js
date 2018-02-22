import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
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
					<div className="createwallet">
						<div className="create-title">Creat Wallet</div>
						<div className="create-container">
							<div className="create-group showback">
								<div className="create-box">
									<div className="create-face">
										<img
											className="wallet-img"
											src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1547869645,1305891110&fm=173&s=44F7C87A0E4604551EA7BAB90300800D&w=218&h=146&img.JPEG"
										/>
										<div className="t1">dasdasd</div>
									</div>
									<div className="create-back">
										<div className="back-img">
											<img
												className="wallet-img1"
												src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1547869645,1305891110&fm=173&s=44F7C87A0E4604551EA7BAB90300800D&w=218&h=146&img.JPEG"
											/>
											<div className="create-detail">
												<div className="detail-item">
													<input
														className="input"
														type="text"
														placeholder="Wallet Name"
													/>
												</div>
												<div className="detail-item">
													<input
														className="input"
														type="password"
														placeholder="Password"
													/>
												</div>
												<div className="detail-item">
													<input
														className="input"
														type="password"
														placeholder="Repeat Password"
													/>
												</div>
												<div className="detail-ctrl">
													<span className="detail-btn">
														Cancel
													</span>
													<span className="detail-btn c">
														Create
													</span>
												</div>
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
