import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default withRouter(
	connect(
		({ globData: { userInfo, lng }, orderlist: { orderList } }) => ({
			userInfo,
			lng,
			orderList
		}),
		{
			...actions,
			...globalActions
		}
	)(Root)
);
