import React, { PureComponent } from "react";
import Select from "react-select";
import { I18n } from "react-i18next";
import "react-select/dist/react-select.css";

class SelectWallet extends PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div>
						<Select />
					</div>
				)}
			</I18n>
		);
	}
}
export default SelectWallet;
