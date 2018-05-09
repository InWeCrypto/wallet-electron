import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		globData: { userInfo, lng },
		ethwallet: {
			ethWalletConversion,

			ethConversion,
			ethGasNum,
			assetsOrderList,
			ethNonce
		}
	}) => ({
		userInfo,
		lng,
		ethWalletConversion,
		ethConversion,
		ethGasNum,
		assetsOrderList,
		ethNonce
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
