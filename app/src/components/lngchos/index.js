import React, { PureComponent } from "react";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cn: true,
			en: false
		};
	}
	componentDidMount() {}
	chooseCn() {
		this.setState({
			cn: true,
			en: false
		});
		this.props.tocn();
	}
	chooseEn() {
		this.setState({
			cn: false,
			en: true
		});
		this.props.toen();
	}
	render() {
		const { cn, en } = this.state;
		return (
			<div className="chooseLng ui ">
				<div className="lng" onClick={this.chooseCn.bind(this)}>
					<div className={cn ? "icon choosed" : "icon"} />
					<div className={cn ? "text choosed" : "text"}>中文</div>
				</div>
				<div className="lng" onClick={this.chooseEn.bind(this)}>
					<div className={en ? "icon choosed" : "icon"} />
					<div className={en ? "text choosed" : "text"}>英文</div>
				</div>
			</div>
		);
	}
}
export default Demo;
