import React, { PureComponent } from "react";
import leftimg from "#/zuo_ico.png";
import rightimg from "#/you_ico.png";
import homeimg from "#/zhuye_ico.png";
import refreshimg from "#/shuaxin_ico.png";
import { getRouteQuery, toHref } from "../../utils/util.js";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	goBack() {
		if (this.props.back && typeof this.props.back == "function") {
			this.props.back();
		} else {
			this.props.history.goBack();
		}
	}
	goNext() {
		if (this.props.go && typeof this.props.go == "function") {
			typeof this.props.go();
		} else {
			this.props.history.go(1);
		}
	}
	goHome() {
		toHref("wallet");
	}
	refreash() {
		let location = this.props.history.location;
		this.props.history.replace(
			`${location.pathname}refresh${location.search}&refresh=1`
		);
		setTimeout(() => {
			this.props.history.replace(
				`${location.pathname}${location.search}`
			);
		}, 10);
	}
	render() {
		const {} = this.props;
		return (
			<div className="header-nav">
				<div className="left ui">
					<div className="btn-back" onClick={this.goBack.bind(this)}>
						<img className="img" src={leftimg} alt="" />
					</div>
					<div className="btn-prev" onClick={this.goNext.bind(this)}>
						<img className="img" src={rightimg} alt="" />
					</div>
					<div className="btn-home" onClick={this.goHome.bind(this)}>
						<img className="img" src={homeimg} alt="" />
					</div>
				</div>
				<div className="right ui">
					<div
						className="btn-refresh"
						onClick={this.refreash.bind(this)}
					>
						<img className="img" src={refreshimg} alt="" />
					</div>
				</div>
			</div>
		);
	}
}
export default Demo;
