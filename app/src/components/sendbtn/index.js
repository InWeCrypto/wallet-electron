import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import "./index.less";

class SendBtn extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			time: props.time ? props.time : 60,
			isSending: false
		};
	}
	sendClick() {
		this.props.onClick(() => {
			this.setState({
				isSending: true
			});
			this.setTime();
		});
	}
	setTime() {
		clearTimeout(timer);
		if (this.state.time <= 0) {
			this.setState({
				isSending: false,
				time: this.props.time ? this.props.time : 60
			});
			return;
		}
		var timer = null;
		let t = this.state.time - 1;
		timer = setTimeout(() => {
			this.setState({
				time: t
			});
			this.setTime();
		}, 1000);
	}
	render() {
		let { className, lng } = this.props;
		let { time, isSending } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div
						className={
							className ? `sendbox ${className}` : "sendbox"
						}
					>
						{!isSending && (
							<div
								className="line-orange"
								onClick={this.sendClick.bind(this)}
							>
								{t("send.txt", lng)}
							</div>
						)}
						{isSending && <div className="disabled">{time}s</div>}
					</div>
				)}
			</I18n>
		);
	}
}

export default SendBtn;
