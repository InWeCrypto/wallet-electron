import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({
		globData: { userInfo, lng },
		neowallet: {
			neoWalletAssets,
			neoConversion,
			sendCapital,
			assetsOrderList
		}
	}) => ({
		userInfo,
		lng,
		neoWalletAssets,
		neoConversion,
		sendCapital,
		assetsOrderList
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
