import React, { PureComponent } from "react";

import "./index.less";
class Title extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const { namestr } = this.props;
		return <div className="c-menutitle">{namestr}</div>;
	}
}
export default Title;
