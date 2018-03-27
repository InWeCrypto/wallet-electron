import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18next";

import "./index.less";
class ConfirmPassword extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			password: ""
		};
	}
	componentDidMount() {
		document.addEventListener(
			"keypress",
			e => {
				if (e.keyCode == 13) {
					this.confirmClick();
				}
			},
			false
		);
	}
	componentWillUnmount() {
		document.removeEventListener("keypress", () => {}, false);
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
	render() {
		let { lng } = this.props;
		let { password } = this.state;
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
									type="password"
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
									<span className="btn button-disabled">
										{t("confirmPassword.confirm", lng)}
									</span>
								)}
								{password.length >= 6 && (
									<span
										className="btn button-green"
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
