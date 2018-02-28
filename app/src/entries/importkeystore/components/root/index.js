import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import Menu from "@/menu";
import HeaderNav from "@/headernav";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 0,
			readFileText: null,
			readFileName: ""
		};
	}
	componentDidMount() {}
	checkClick(idx) {
		this.setState({
			type: idx
		});
	}
	inputFileChange(e) {
		let file = e.target.files[0];
		let path = file.path;
		this.setState({
			readFileName: path
		});
		fs.readFile(path, "utf8", (err, data) => {
			if (err) {
				Msg.alert("读取文件错误");
				return;
			}
			this.setState({
				readFileText: data
			});
		});
	}
	render() {
		let { lng } = this.props;
		let { type, readFileText, readFileName } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="main-box">
						<Menu curmenu="wallet" />
						<div className="content-container">
							<HeaderNav />
							<div className="content">
								<div className="importkeystore">
									<div className="keystore-title">
										{t("keyStore.title", lng)}
									</div>
									<div className="keystore-container">
										<div className="keystore-box">
											<div className="keystore-group ui">
												{type == 0 && (
													<i className="icon-check checked" />
												)}
												{type != 0 && (
													<i
														className="icon-check uncheck"
														onClick={this.checkClick.bind(
															this,
															0
														)}
													/>
												)}
												<div className="f1">
													<textarea
														className="keystore-text"
														placeholder={t(
															"keyStore.textarea",
															lng
														)}
													/>
												</div>
											</div>
											<div className="keystore-group ui">
												{type == 1 && (
													<i className="icon-check checked" />
												)}
												{type != 1 && (
													<i
														className="icon-check uncheck"
														onClick={this.checkClick.bind(
															this,
															1
														)}
													/>
												)}
												<div className="f1 ui center">
													<div className="f1">
														<input
															type="text"
															disabled="disabled"
															className="filename"
															placeholder={t(
																"keyStore.input",
																lng
															)}
															value={readFileName}
														/>
													</div>
													<div className="file-btn">
														<input
															ref="inputFile"
															type="file"
															onChange={this.inputFileChange.bind(
																this
															)}
														/>
														<i className="icon-openfile" />
													</div>
												</div>
											</div>
											<div className="key-next">
												<span className="keybtn">
													{t("keyStore.next", lng)}
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
