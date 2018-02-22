import React, { PureComponent } from "react";
import { Menu, Dropdown, Icon, Modal, Button, Pagination } from "antd";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: 0
		};
	}
	componentDidMount() {}
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.category_id) {
			this.setState({
				type: nextProps.category_id
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			type: nextProps.type
		});
	}
	onSelectType(e) {
		const key = e.key;
		this.props.getkey(key);
		this.setState({
			type: key
		});
	}
	render() {
		const { type } = this.state;
		const { typeList } = this.props;

		const menu = (
			<Menu onClick={this.onSelectType.bind(this)}>
				{typeList &&
					typeList.map((item, index) => {
						return <Menu.Item key={index}>{item}</Menu.Item>;
					})}
			</Menu>
		);
		return (
			<div className="c-dropdown ui">
				<Dropdown overlay={menu} placement="bottomLeft">
					<Button>
						{!type ? typeList[0] : typeList[type]}
						<Icon type="down" />
					</Button>
				</Dropdown>
			</div>
		);
	}
}
export default Demo;
