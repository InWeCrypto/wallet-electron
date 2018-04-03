import http from "../../utils/ajax";
window.walletState = (function(win, http, undefined) {
	var local = window.localStorage;
	var timer = null;
	var WalletState = function() {
		checkState.call(this);
	};
	var checkState = async function() {
		var stateL = local.getItem("walletState");
		var _this = this;
		if (
			stateL &&
			stateL.length > 0 &&
			JSON.parse(stateL) instanceof Array &&
			JSON.parse(stateL).length > 0
		) {
			let list = JSON.parse(stateL);
			for (let i = 0; i < list.length; i++) {
				if (list[i]) {
					var isPending = true;
					var state = await checkSingle({
						wallet_id: list[i].wallet_id,
						flag: list[i].flag,
						asset_id: list[i].asset_id
					});
					if (state && state.length > 0) {
						state.map(function(v, i) {
							if (v.confirmTime && v.confirmTime.length > 0) {
								isPending = false;
							}
						});
					}
					if (!isPending) {
						setTimeout(
							function() {
								_this.removeItem(list[i].txid);
							}.bind(this),
							5000
						);
					}
				}
			}
		}
		clearTimeout(timer);
		timer = setTimeout(
			function() {
				checkState.call(this);
			}.bind(this),
			30000
		);
	};
	var checkSingle = async function(params) {
		var res = await http.get({
			url: "wallet-order",
			params
		});
		if (res && res.code === 4000) {
			return Promise.resolve(res.data.list);
		} else {
			return false;
		}
	};

	WalletState.prototype = {
		addItem: function(item) {
			if (!item) {
				return;
			}
			var walletS = local.getItem("walletState");
			if (!walletS) {
				walletS = [];
			} else {
				walletS = JSON.parse(walletS);
			}
			walletS.push(item);
			local.setItem("walletState", JSON.stringify(walletS));
		},
		removeItem: function(hashid) {
			if (!hashid) {
				return;
			}
			var walletS = local.getItem("walletState");
			if (!walletS) {
				return;
			}
			walletS = JSON.parse(walletS);
			if (!(walletS instanceof Array)) {
				return;
			}
			var list = walletS.filter(function(item, index) {
				if (item && item.txid != hashid) {
					return item;
				}
			});
			if (!list) {
				list = [];
			}
			local.setItem("walletState", JSON.stringify(list));
		},
		checkItem: function(address) {
			if (!address) {
				return false;
			}
			var walletS = local.getItem("walletState");
			if (
				!walletS ||
				walletS.length <= 0 ||
				!(JSON.parse(walletS) instanceof Array)
			) {
				return false;
			}
			var arr = JSON.parse(walletS);
			let isPending = false;
			arr.map(function(item, index) {
				if (item && item.from == address) {
					isPending = true;
				}
			});
			return isPending;
		}
	};
	return new WalletState();
})(window, http);
