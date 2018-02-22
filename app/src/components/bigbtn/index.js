import React, { PureComponent } from "react";

import "./index.less";
class Title extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const { namestr, icon } = this.props;
		return (
			<div className="c-bigbtn">
				<div className="icon">
					<img src={icon} alt="" />
				</div>
				<div className="c-bigbtn-name">{namestr}</div>
			</div>
		);
	}
}
export default Title;
