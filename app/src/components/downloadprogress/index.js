import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { BigNumber } from "bignumber.js";

import "./index.less";

class DownloadProgress extends PureComponent {
	constructor() {
		super();
		this.state = {
			totle: 0,
			transferred: 0,
			percent: 0,
			bytesPerSecond: 0
		};
	}
	componentDidMount() {
		ipc.once("startUpdate", function() {
			let box = document.querySelector("#downloadP");
			box.className = "downloadP show";
			setTimeout(() => {
				box.className = "downloadP show animate";
			}, 300);
		});
		ipc.once("endUpdate", function() {
			let box = document.querySelector("#downloadP");
			box.className = "downloadP";
		});
		ipc.on("downUpdate", (event, res) => {
			if (res) {
				this.setState({
					totle: this.bytesToMB(res.total),
					transferred: this.bytesToMB(res.transferred),
					percent: res.percent.toFixed(2) + "%",
					bytesPerSecond: this.bytesToMB(res.bytesPerSecond)
				});
			}
		});
	}
	bytesToMB(bytes) {
		if (!bytes) {
			return 0;
		}
		let num = new BigNumber(bytes).dividedBy(1024).dividedBy(1024);
		let s = getNumberString(num.toNumber()) + "";
		let res = s.substring(0, s.lastIndexOf(".") + 3);
		return res;
	}
	render() {
		let { totle, transferred, percent, bytesPerSecond } = this.state;
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="downloadP" id="downloadP">
						<div className="download-box">
							<div className="download-title">
								{t("downloadP.title", lng)}
							</div>
							<div className="ui">
								<div className="txt f1">
									{t("downloadP.progress", lng)}:{transferred}/{
										totle
									}Mb
								</div>
								<div className="txt">
									{t("downloadP.speed", lng)}:{bytesPerSecond}Mb/s
								</div>
							</div>
							<div className="download-line">
								<div
									className="download-inline"
									style={{ width: percent }}
								/>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default DownloadProgress;
