import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		let { lng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="wallet">
						<div className="box1 ui center">
							<img
								className="icon"
								src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2743341508,493051922&fm=173&s=F203B14451608CEC1EFED1830300309B&w=218&h=146&img.JPEG"
							/>
							<div className="f1">
								<div className="name">sdasdas</div>
								<div className="address">3232</div>
							</div>
							<div className="money">$100.00</div>
						</div>
						<div className="box2 ui center">
							<div className="navbox f1">
								<div className="nav-item">Asset</div>
								<div className="nav-item">Send</div>
								<div className="nav-item">Receive</div>
								<div className="nav-item">Record</div>
							</div>
							<div>22</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
