import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		globData: { userInfo, lng },
		watchwallet: { watchInfo, watchConver, walletList }
	}) => ({
		userInfo,
		lng,
		watchInfo,
		watchConver,
		walletList
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
