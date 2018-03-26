import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { getQuery } from "../../../../utils/util";
import QRCode from "../../../../assets/js/qcode";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			str: null,
			title: null
		};
	}
	componentDidMount() {
		document.title = "Print Preview";
		let q = getQuery(window.location.href);
		this.setState({
			str: q.str,
			title: q.title
		});
		this.setQcode(q.str);
	}
	printPDFClick() {
		ipc.send("print-to-pdf", {
			url: window.location.href,
			title: this.state.title
		});
	}
	setQcode(str) {
		var box = document.getElementById("qrcode");
		var n = box.offsetWidth - 10;
		var qrcode = new QRCode(box, {
			width: n, //设置宽高
			height: n
		});
		qrcode.makeCode(str);
	}
	printClick() {
		window.print();
	}
	render() {
		let { lng } = this.props;
		let { str, title } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="printpage">
						<div className="print-title">{title}</div>
						<div className="qcodebox" id="qrcode" />
						<div className="print-str">{str}</div>
						<span
							className="printbtn button-green"
							onClick={this.printPDFClick.bind(this)}
						>
							{t("walletDetail.printPDF", lng)}
						</span>
						<span
							className="printbtn button-green"
							onClick={this.printClick.bind(this)}
						>
							{t("walletDetail.print", lng)}
						</span>
					</div>
				)}
			</I18n>
		);
	}
}
