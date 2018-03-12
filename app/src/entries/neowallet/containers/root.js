import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({
		globData: { userInfo, lng },
		neowallet: {
			neoWalletDetailInfo,
			neoWalletAssets,
			neoConversion,
			sendCapital,
			assetsOrderList
		}
	}) => ({
		userInfo,
		lng,
		neoWalletDetailInfo,
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
