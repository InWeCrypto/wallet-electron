import React, { PureComponent } from "react";

import "./index.less";
class Demo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			keyword: "",
			isFocus: false
		};
		this.pressSearch = this.pressSearch.bind(this);
	}
	componentDidMount() {
		this.refs.searchInput.addEventListener("keypress", pressSearch);
	}
	componentWillUnmount() {
		this.refs.searchInput.removeEventListener("keypress", pressSearch);
	}
	pressSearch(e) {
		if (e.keyCode === 13 && this.state.isFocus) {
			this.props.search(this.state.keyword);
		}
	}
	searchInput(e) {
		this.setState({
			keyword: e.target.value
		});
	}
	searchFocus() {
		this.setState({
			isFocus: true
		});
	}
	searchBlur() {
		this.setState({
			isFocus: false
		});
	}
	render() {
		const { placeholder, keyword } = this.props;
		return (
			<div className="c-search">
				<div className="searchicon Ycenter" />
				<input
					ref="searchInput"
					type="text"
					onFocus={this.searchFocus.bind(this)}
					onBlur={this.searchBlur.bind(this)}
					placeholder={placeholder ? placeholder : "查找项目"}
					value={keyword}
					onChange={this.searchInput.bind(this)}
				/>
			</div>
		);
	}
}
export default Demo;
