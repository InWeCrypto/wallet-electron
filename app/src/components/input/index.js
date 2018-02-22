import React, { PureComponent } from "react";

import "./index.less";
class Input extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	blur() {
		this.setState({
			isFocus: false
		});
	}
	focus() {
		this.setState({
			isFocus: true
		});
	}
	sendVal(e) {
		let val = e.target.value;
		this.props.getval(val);
	}
	render() {
		const { name, placeholder, width, val } = this.props;
		return (
			<div className="c-inputBox ui">
				<div className="name">{name}</div>
				<div
					style={{ width }}
					className={this.state.isFocus ? "input focus" : "input"}
				>
					<input
						value={val}
						type="text"
						placeholder={placeholder}
						onBlur={this.blur.bind(this)}
						onFocus={this.focus.bind(this)}
						onChange={this.sendVal.bind(this)}
					/>
				</div>
			</div>
		);
	}
}
export default Input;
