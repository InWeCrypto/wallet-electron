import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isShow: [false]
		};
		this.groupClose = this.groupClose.bind(this);
	}
	componentDidMount() {
		document.addEventListener("click", this.groupClose, false);
	}
	groupClose() {
		let list = this.state.isShow.map(item => {
			item = false;
			return item;
		});
		this.setState({
			isShow: list
		});
	}
	componentWillUnmount() {
		document.removeEventListener("click", this.groupClose, false);
	}
	openFaceClick(idx, e) {
		let list = this.state.isShow.map((item, index) => {
			if (idx === index) {
				item = true;
			} else {
				item = false;
			}
			return item;
		});
		this.setState({
			isShow: [...list]
		});
		e.nativeEvent.stopImmediatePropagation();
	}
	closeClick(e) {
		let list = this.state.isShow.map((item, index) => {
			item = false;
			return item;
		});
		this.setState({
			isShow: [...list]
		});
		e.nativeEvent.stopImmediatePropagation();
	}
	render() {
		let { lng } = this.props;
		let { isShow } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="createwallet" id="createWallet">
						<div className="create-title">
							{t("createWallet.title", lng)}
						</div>
						<div className="create-container">
							<div
								className={
									isShow[0]
										? "create-group showback"
										: "create-group"
								}
							>
								<div className="create-box">
									<div
										className="create-face"
										onClick={this.openFaceClick.bind(
											this,
											0
										)}
									>
										<img
											className="wallet-img"
											src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1547869645,1305891110&fm=173&s=44F7C87A0E4604551EA7BAB90300800D&w=218&h=146&img.JPEG"
										/>
										<div className="t1">dasdasd</div>
									</div>
									<div
										className="create-back"
										onClick={e => {
											e.nativeEvent.stopImmediatePropagation();
										}}
									>
										<div className="back-img">
											<img
												className="wallet-img1"
												src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1547869645,1305891110&fm=173&s=44F7C87A0E4604551EA7BAB90300800D&w=218&h=146&img.JPEG"
											/>
										</div>
										<div className="create-detail">
											<div className="detail-item">
												<input
													className="input"
													type="text"
													placeholder={t(
														"createWallet.walletName",
														lng
													)}
												/>
											</div>
											<div className="detail-item">
												<input
													className="input"
													type="password"
													placeholder={t(
														"createWallet.password",
														lng
													)}
												/>
											</div>
											<div className="detail-item">
												<input
													className="input"
													type="password"
													placeholder={t(
														"createWallet.repeatPassword",
														lng
													)}
												/>
											</div>
											<div className="detail-ctrl">
												<span
													onClick={this.closeClick.bind(
														this
													)}
													className="detail-btn"
												>
													{t(
														"createWallet.cancel",
														lng
													)}
												</span>
												<span className="detail-btn c">
													{t(
														"createWallet.create",
														lng
													)}
												</span>
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
