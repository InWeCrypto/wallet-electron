import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({
		globData: { userInfo, lng },
		wallet: { walletList, walletConversion, walletDetail }
	}) => ({
		userInfo,
		lng,
		walletList,
		walletConversion,
		walletDetail
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
