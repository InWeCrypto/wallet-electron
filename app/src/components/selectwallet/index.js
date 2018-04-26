import React, { PureComponent } from "react";
import Select from "react-select";
import { I18n } from "react-i18next";
import "react-select/dist/react-select.css";
import "./index.less";
function setEllipsis(str) {
	if (str.length < 8) {
		return str;
	}
	var s1 = str.substring(0, 4);
	var s2 = str.substring(str.length - 4, str.length);
	return s1 + "****" + s2;
}
class GravatarOptions extends PureComponent {
	constructor(props) {
		super(props);
	}
	handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}
	handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	}
	handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}
	render() {
		return (
			<I18n>
				{(t, { i18n }) => (
					<div
						onMouseDown={this.handleMouseDown.bind(this)}
						onMouseEnter={this.handleMouseEnter.bind(this)}
						onMouseMove={this.handleMouseMove.bind(this)}
						className="options"
					>
						<div className="ui">
							<div className="f1">{this.props.option.name}</div>
							<div>{this.props.option.banlance}</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
class GravatarValue extends PureComponent {
	constructor() {
		super();
	}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="value-box">
						<div className="ui">
							<div className="f1">{this.props.value.name}</div>
							<div>{this.props.value.banlance}</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}

class SelectWallet extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.options
				? props.options[0]
					? props.options[0]
					: ""
				: "",
			lng: props.lng,
			clearable: false
		};
	}
	setValue(value) {
		this.setState({ value });
		if (this.props.onChange && typeof this.props.onChange === "function") {
			this.props.onChange(value);
		}
	}
	render() {
		let { lng, options, placeholder } = this.props;
		let { value } = this.state;

		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="select-wallet">
						<Select
							onChange={this.setValue.bind(this)}
							optionComponent={GravatarOptions}
							options={options}
							value={value}
							placeholder={placeholder}
							valueComponent={GravatarValue}
							lng={lng}
						/>
					</div>
				)}
			</I18n>
		);
	}
}
export default SelectWallet;
