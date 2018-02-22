import React, { PureComponent } from "react";

import "./index.less";
class Input extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const { name, content } = this.props;
		return (
			<div className="c-inputBox ui">
				<div className="name">{name}</div>
				<div className="text">{content}</div>
			</div>
		);
	}
}
export default Input;
