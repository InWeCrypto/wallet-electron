import React, { PureComponent } from "react";
import { I18n } from "react-i18next";
import { Select } from "antd";
const Option = Select.Option;
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 2
		};
	}
	componentDidMount() {}
	navCur(idx) {
		return idx === this.state.type ? "nav-item cur" : "nav-item";
	}
	changeNav(idx) {
		this.setState({
			type: idx
		});
	}
	render() {
		let { lng } = this.props;
		let { type } = this.state;
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
								<div
									onClick={this.changeNav.bind(this, 1)}
									className={this.navCur.bind(this, 1)()}
								>
									Asset
								</div>
								<div
									onClick={this.changeNav.bind(this, 2)}
									className={this.navCur.bind(this, 2)()}
								>
									Send
								</div>
								<div
									onClick={this.changeNav.bind(this, 3)}
									className={this.navCur.bind(this, 3)()}
								>
									Receive
								</div>
								<div
									onClick={this.changeNav.bind(this, 4)}
									className={this.navCur.bind(this, 4)()}
								>
									Record
								</div>
							</div>
							<div className="box-btn line-orange">
								<div className="t1">Claim</div>
								<div className="t2">2000.00GAS</div>
							</div>
							<div className="box-btn line-orange">Add Asset</div>
						</div>
						{type === 1 && (
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
						)}
						{type === 2 && (
							<div className="box4">
								<div className="send-item">
									<div className="send-name">
										Sent to Address
									</div>
									<div className="input-box">
										<input type="text" className="input" />
									</div>
								</div>
								<div className="send-item">
									<div className="send-name ui">
										<div className="f1">Amount</div>
										<div className="t1">
											Available：10.0000 RDN
										</div>
									</div>
									<div className="ui input-box">
										<input type="text" className="input" />
										<div>
											<Select
												defaultValue="jack"
												style={{
													width: 120,
													height: 60
												}}
											>
												<Option value="jack">
													Jack
												</Option>
											</Select>
										</div>
									</div>
								</div>
								<div className="btn-box">
									<span className="button-green">Send</span>
								</div>
							</div>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
