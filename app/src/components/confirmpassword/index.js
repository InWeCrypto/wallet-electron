import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";

import "./index.less";
class ConfirmPassword extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			isfocus: false
		};
		this.keyPressClick = this.keyPressClick.bind(this);
	}
	componentDidMount() {
		document.addEventListener("keypress", this.keyPressClick);
		document.querySelector("#passInput").focus();
	}
	componentWillUnmount() {
		document.removeEventListener("keypress", this.keyPressClick);
	}
	keyPressClick(e) {
		if (e.keyCode == 13 && this.state.isfocus) {
			this.confirmClick();
		}
	}
	inputChange(e) {
		this.setState({
			password: e.target.value
		});
	}
	cannelClick() {
		this.props.close();
	}
	confirmClick() {
		this.props.confirm(this.state.password);
	}
	onFocus() {
		this.setState({
			isfocus: true
		});
	}
	onBlur() {
		this.setState({
			isfocus: false
		});
	}
	render() {
		let { lng } = this.props;
		let { password, isfocus } = this.state;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="confirm-password">
						<div className="confirm-box">
							<div className="confirm-txt">
								{t("confirmPassword.title", lng)}
							</div>
							<div>
								<input
									className="input"
									onChange={this.inputChange.bind(this)}
									onFocus={this.onFocus.bind(this)}
									onBlur={this.onBlur.bind(this)}
									type="password"
									id="passInput"
									placeholder={t(
										"confirmPassword.holder",
										lng
									)}
								/>
							</div>
							<div className="confirmbtn">
								<span
									className="btn button-default"
									onClick={this.cannelClick.bind(this)}
								>
									{t("confirmPassword.cannel", lng)}
								</span>
								{password.length < 6 && (
									<span className="btn button-disabled1">
										{t("confirmPassword.confirm", lng)}
									</span>
								)}
								{password.length >= 6 && (
									<span
										className="btn button-green1"
										onClick={this.confirmClick.bind(this)}
									>
										{t("confirmPassword.confirm", lng)}
									</span>
								)}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
ConfirmPassword.propTypes = {
	close: PropTypes.func,
	confirm: PropTypes.func
};
export default ConfirmPassword;
