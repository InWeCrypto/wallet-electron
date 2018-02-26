import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({
		globData: { userInfo, lng, walletTypes },
		createWallet: { createWalletR, createAddress }
	}) => ({
		userInfo,
		walletTypes,
		lng,
		createWalletR,
		createAddress
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
