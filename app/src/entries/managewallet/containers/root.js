import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({
		globData: { userInfo, lng },
		managerWallet: { deleteLocal, deleteServer }
	}) => ({
		userInfo,
		lng,
		deleteLocal,
		deleteServer
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
