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
								<div className="name">
									<span>sdasdas</span>
									<span className="watch">watch</span>
								</div>
								<div className="address">3232</div>
							</div>
							<div className="money">$100.00</div>
						</div>
						<div className="box2 ui center">
							<div className="navbox f1">
								<div className="nav-item cur">Asset</div>
								<div className="nav-item">Send</div>
								<div className="nav-item">Receive</div>
								<div className="nav-item">Record</div>
							</div>
							<div className="box-btn disabled">
								<div className="t1">Claim</div>
								<div className="t2">2000.00GAS</div>
							</div>
							<div className="box-btn">Add Asset</div>
						</div>
						<div className="box3">
							<div className="wallet-item ui center">
								<img
									className="icon"
									src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=703596290,1200042368&fm=173&s=05105F955E20468E2A8D7D610300E0F0&w=218&h=146&img.JPEG"
								/>
								<div className="f1 name">22</div>
								<div>
									<div className="t1">2</div>
									<div className="t1">2</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
