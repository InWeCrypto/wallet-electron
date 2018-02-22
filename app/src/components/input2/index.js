import React, { PureComponent } from "react";

import "./index.less";
class Input extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isFocus: false,
			isFocus2: false
		};
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
	blur2() {
		this.setState({
			isFocus2: false
		});
	}
	focus2() {
		this.setState({
			isFocus2: true
		});
	}
	sendValName(e) {
		let val = e.target.value;
		let idx = this.props.idx;
		this.props.getvalname(val, idx, true);
	}
	sendValUrl(e) {
		let val = e.target.value;
		let idx = this.props.idx;
		this.props.getvalurl(val, idx, false);
	}
	render() {
		const {
			name,
			placeholder,
			placeholder2,
			width,
			mess,
			valname,
			valurl
		} = this.props;
		return (
			<div className="c-input2Box ">
				<div className="textbox">
					<div className="namex">{name}</div>
					{mess && <div className="messx">({mess})</div>}
				</div>
				<div
					style={{ width }}
					className={this.state.isFocus ? "input focus" : "input"}
				>
					<input
						value={valname}
						type="text"
						placeholder={placeholder}
						onBlur={this.blur.bind(this)}
						onFocus={this.focus.bind(this)}
						onChange={this.sendValName.bind(this)}
					/>
				</div>
				{placeholder2 && (
					<div
						className={
							this.state.isFocus2 ? "input2 focus" : "input2"
						}
					>
						<input
							value={valurl}
							type="text"
							placeholder={placeholder2}
							onBlur={this.blur2.bind(this)}
							onFocus={this.focus2.bind(this)}
							onChange={this.sendValUrl.bind(this)}
						/>
					</div>
				)}
			</div>
		);
	}
}
export default Input;
