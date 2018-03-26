import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default withRouter(
	connect(
		({
			globData: { userInfo, lng },
			orderlist: { orderList, minBlock, currentBlockNumber, blockSecond }
		}) => ({
			userInfo,
			lng,
			orderList,
			minBlock,
			currentBlockNumber,
			blockSecond
		}),
		{
			...actions,
			...globalActions
		}
	)(Root)
);
