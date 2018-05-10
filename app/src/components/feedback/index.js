import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import "./index.less";
class FeedBack extends PureComponent {
	constructor() {
		super();
		this.state = {
			type: 1,
			content: "",
			contact: ""
		};
	}
	radioCheck(type) {
		this.setState({
			type: type
		});
	}
	inputChange(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	async submitFeed() {
		let { type, content, contact } = this.state;
		if (content.length <= 0) {
			Msg.prompt(i18n.t("feedback.contentEmpty", this.props.lng));
			return;
		}
		if (contact.length <= 0) {
			Msg.prompt(i18n.t("feedback.contactEmpty", this.props.lng));
			return;
		}
		if (!this.props.submit || typeof this.props.submit != "function") {
			Msg.prompt(i18n.t("feedback.subError", this.props.lng));
			return;
		}
		let sub = await this.props.submit({
			type: type,
			content: content,
			contact: contact
		});
		if (sub && sub.code === 4000) {
			Msg.prompt(i18n.t("feedback.success", this.props.lng));
			setTimeout(() => {
				this.props.close();
			}, 2000);
		}
	}
	closeBox() {
		if (this.props.close && typeof this.props.close == "function") {
			this.props.close();
		}
	}
	render() {
		let { lng } = this.props;
		let { type, content, contact } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="feedback">
						<div className="feedback-box">
							<div className="feedback-title" />
							<div className="feedback-content">
								<div className="txt1">
									{t("feedback.title", lng)}
								</div>
								<div className="txt2">
									{t("feedback.type", lng)}
								</div>
								<div className="radio-box">
									<label
										className="label"
										onClick={this.radioCheck.bind(this, 1)}
									>
										{type == 1 && (
											<i className="font_family icon-checked" />
										)}
										{type != 1 && (
											<i className="font_family icon-uncheck" />
										)}
										<span>{t("feedback.type1", lng)}</span>
									</label>
									<label
										className="label"
										onClick={this.radioCheck.bind(this, 2)}
									>
										{type == 2 && (
											<i className="font_family icon-checked" />
										)}
										{type != 2 && (
											<i className="font_family icon-uncheck" />
										)}
										<span>{t("feedback.type2", lng)}</span>
									</label>
									<label
										className="label"
										onClick={this.radioCheck.bind(this, 3)}
									>
										{type == 3 && (
											<i className="font_family icon-checked" />
										)}
										{type != 3 && (
											<i className="font_family icon-uncheck" />
										)}
										<span>{t("feedback.type3", lng)}</span>
									</label>
								</div>
								<div className="feedback-text">
									<textarea
										className="area"
										placeholder={t("feedback.place1", lng)}
										onChange={this.inputChange.bind(
											this,
											"content"
										)}
									/>
								</div>
								<div className="contact">
									<input
										className="contact-input"
										type="text"
										placeholder={t("feedback.place2", lng)}
										onChange={this.inputChange.bind(
											this,
											"contact"
										)}
									/>
								</div>
								<div className="feedback-btn">
									<span
										onClick={this.closeBox.bind(this)}
										className="button-default btn"
									>
										{t("feedback.btn1", lng)}
									</span>
									<span
										onClick={this.submitFeed.bind(this)}
										className="button-default btn"
									>
										{t("feedback.btn0", lng)}
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default FeedBack;
