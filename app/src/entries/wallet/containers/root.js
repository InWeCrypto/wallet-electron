import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({ globData: { userInfo, lng }, wallet: { walletList } }) => ({
		userInfo,
		lng,
		walletList
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
