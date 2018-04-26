import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import Menu from "@/menu/index.js";
import HeaderNav from "@/headernav/index.js";
import img from "#/zhuye_ico.png";
import QRCode from "../../../../assets/js/qcode";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.setQcode("22dsadxzczxcxcxcsads");
	}
	setCopy() {
		clipboard.writeText("text");
		Msg.prompt(i18n.t("success.copySucess", this.props.lng));
	}
	setPrint() {
		ipc.send("print-preview", {
			str: "walletadderss",
			title: "walletName"
		});
	}
	setQcode(str) {
		setTimeout(() => {
			var box = document.getElementById("qrcode");
			box.className = "qcode show";
			box.innerHTML = "";
			var n = box.offsetWidth - 40;
			console.log(n);
			var qrcode = new QRCode(box, {
				width: n, //设置宽高
				height: n
			});
			qrcode.makeCode(str);
		}, 10);
	}
	render() {
		let { lng } = this.props;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box wallet-qcode">
						<Menu curmenu="dashboard" lng={lng} />
						<div className="content-container">
							<HeaderNav history={this.props.history} />
							<div className="content qcode-content">
								<div className="title">Recive</div>
								<div className="walletqcode-box">
									<div className="txt">
										Recive ETH/ ERC 20 Token
									</div>
									<div className="qcode-box">
										<div
											className="qcode-item"
											id="qrcode"
										/>
									</div>
									<div className="btn-box">
										<span
											className="button-green"
											onClick={this.setCopy.bind(this)}
										>
											<i className="icon-copy" />
											<span className="t">
												{t("walletDetail.copy", lng)}
											</span>
										</span>
										<span
											className="button-green"
											onClick={this.setPrint.bind(this)}
										>
											<i className="icon-print" />
											<span className="t">
												{t("walletDetail.print", lng)}
											</span>
										</span>
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
