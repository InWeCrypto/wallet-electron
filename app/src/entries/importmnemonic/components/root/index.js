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
					<div className="importmnemonic">
						<div className="title">Mnemonic</div>
						<div className="mnemonic-container ui jcenter">
							<div className="mnemonic-box">
								<div>
									<textarea className="textarea" />
								</div>
								<div className="mnemonic-btn">
									<span className="btn">next</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
