import React, { PureComponent } from "react";
import QRCode from "../../assets/js/qcode";
import "./index.less";

class ShowQCode extends PureComponent {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	setQcode(str) {
		if (!str || str.length <= 0) {
			return;
		}
		setTimeout(() => {
			let box = document.getElementById("qrcodebox");
			let n = box.offsetWidth - 20;
			let qrcode = new QRCode(box, {
				width: n, //设置宽高
				height: n,
				correctLevel: QRCode.CorrectLevel.L
			});
			qrcode.makeCode(str);
		}, 10);
	}
	close() {
		let { close } = this.props;
		if (typeof close === "function") this.props.close();
	}
	render() {
		this.setQcode(this.props.codestr);
		return (
			<div className="showQcode">
				<div className="close" onClick={this.close.bind(this)} />
				<div className="imgBox" id="qrcodebox" />
			</div>
		);
	}
}
export default ShowQCode;
