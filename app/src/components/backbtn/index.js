import React, { PureComponent } from "react";

import "./index.less";
import { toHref } from "../../utils/util";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	back() {
		let tosit = this.props.tosit;
		if (tosit) {
			toHref(tosit);
		} else {
			window.history.go(-1);
		}
	}
	render() {
		const {} = this.props;
		return (
			<div
				className="backBtn"
				style={{ top: "0.5rem" }}
				onClick={this.back.bind(this)}
			/>
		);
	}
}
export default Demo;
