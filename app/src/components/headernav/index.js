import React, { PureComponent } from "react";
import leftimg from "#/zuo_ico.png";
import rightimg from "#/you_ico.png";
import homeimg from "#/zhuye_ico.png";
import refreshimg from "#/shuaxin_ico.png";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const {} = this.props;
		return (
			<div className="header-nav">
				<div className="left ui">
					<div className="btn-back">
						<img className="img" src={leftimg} alt="" />
					</div>
					<div className="btn-prev">
						<img className="img" src={rightimg} alt="" />
					</div>
					<div className="btn-home">
						<img className="img" src={homeimg} alt="" />
					</div>
				</div>
				<div className="right ui">
					<div className="btn-refresh">
						<img className="img" src={refreshimg} alt="" />
					</div>
				</div>
			</div>
		);
	}
}
export default Demo;
