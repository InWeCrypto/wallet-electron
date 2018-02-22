import React, { PureComponent } from "react";
import icon from "../../assets/images/gou_ico.png";

import "./index.less";
class Progress extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const { arr } = this.props;
		return (
			<div className="c-progress ui">
				{arr.map((val, idx) => {
					return (
						<div className="c-pro-cell" key={idx}>
							{val.iscomplete ? (
								<div className="c-pro-cell-num complete">
									<div className="imgbox">
										<img
											className="img"
											src={icon}
											alt=""
										/>
									</div>
								</div>
							) : (
								<div className="c-pro-cell-num">{idx + 1}</div>
							)}
							<div
								className={
									val.iscomplete
										? "c-pro-cell-name complete"
										: "c-pro-cell-name"
								}
							>
								{val.name}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
export default Progress;
