import React, { PureComponent } from "react";
import { NavLink, Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
import QRCode from "../../../../assets/js/qcode";
import Menu from "@/menu/index.js";
import ShowQCode from "@/showqcode";
import HeaderNav from "@/headernav/index.js";

import "./index.less";
import { link } from "fs";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			address: null,
			name: null,
			isShowBig: false
		};
	}
	componentDidMount() {
		let q = getQuery(window.location.href);
		if (q.address) {
			this.setState({
				address: q.address,
				name: q.name
			});
			this.props.getWalletDetail({
				address: q.address
			});
		}
	}
	setCopy(str) {
		clipboard.writeText(str);
		Msg.prompt(i18n.t("success.copySucess", this.props.lng));
		setBackUp(this.props.walletDetail.address);
	}
	setQcode(str) {
		if (!str || str.length <= 0) {
			return;
		}
		setTimeout(() => {
			var box = document.getElementById("qrcode");
			box.innerHTML = "";
			var n = box.offsetWidth - 10;
			var qrcode = new QRCode(box, {
				width: n, //设置宽高
				height: n,
				correctLevel: QRCode.CorrectLevel.L
			});
			qrcode.makeCode(str);
		}, 10);
	}
	showBig() {
		this.setState({
			isShowBig: true
		});
	}
	closeBig() {
		this.setState({
			isShowBig: false
		});
	}
	exportFile() {
		ipc.send("exportJSON", {
			title: this.state.name,
			data: this.props.walletDetail.json
		});
		setBackUp(this.props.walletDetail.address);
	}
	render() {
		let { lng, walletDetail } = this.props;
		let { isShowBig } = this.state;
		if (walletDetail) {
			this.setQcode(walletDetail.json);
		}

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box keystore">
						<Menu curmenu="wallet" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content keystore-content">
								<div className="title">
									{t("backKey.title", lng)}
								</div>
								<div className="cokBox">
									<div
										className="titleImg "
										id="qrcode"
										onClick={this.showBig.bind(this)}
									/>
									<div className="tip">
										点击放大才能扫描二维码
									</div>
									<div className="showWordBox">
										{walletDetail && walletDetail.json}
									</div>
									<div className="btnBox">
										<div
											className="left btn-cell"
											onClick={this.exportFile.bind(this)}
										>
											<div className="img">
												<div className="icon file" />
												<p>
													{t("backKey.export", lng)}
												</p>
											</div>
										</div>
										<div className="right btn-cell">
											<div
												className="img"
												onClick={this.setCopy.bind(
													this,
													walletDetail &&
														walletDetail.json
												)}
											>
												<div className="icon copy" />
												<p>{t("backKey.copy", lng)}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							{isShowBig && (
								<ShowQCode
									codestr={walletDetail && walletDetail.json}
									close={this.closeBig.bind(this)}
								/>
							)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
