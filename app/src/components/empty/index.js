import React, { PureComponent } from "react";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const {} = this.props;
		return <div className="c-demo ui">123</div>;
	}
}
export default Demo;
