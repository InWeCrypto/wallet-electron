import http from "../../utils/ajax";
window.walletState = (function(win, http, undefined) {
	var local = window.localStorage;
	var timer = null;
	var WalletState = function() {
		checkState.call(this);
	};
	var checkState = async function() {
		var isTest = this.checkTest();
		var stateL = isTest
			? local.getItem("walletStateTest")
			: local.getItem("walletState");
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
					if (!list[i].from || list[i].from.indexOf("0x") != -1) {
						return;
					}
					var isPending = true;
					var state = await checkSingle({
						wallet_id: list[i].wallet_id,
						flag: list[i].flag,
						asset_id: list[i].asset_id
					});
					if (state && state.length > 0) {
						var num = 0;
						state.map(function(v) {
							if (
								list[i].txid &&
								v.tx &&
								list[i].txid.replace(/^0x/, "") ==
									v.tx.replace(/^0x/, "") &&
								v.confirmTime &&
								v.confirmTime.length > 0
							) {
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
		checkTest: function() {
			let dev = localStorage.getItem("isDev");
			if (dev && JSON.parse(dev)) {
				return true;
			} else {
				return false;
			}
		},
		addItem: function(item) {
			if (!item) {
				return;
			}
			var isTest = this.checkTest();
			var walletS = isTest
				? local.getItem("walletStateTest")
				: local.getItem("walletState");
			if (!walletS) {
				walletS = [];
			} else {
				walletS = JSON.parse(walletS);
			}
			walletS.push(item);
			local.setItem(
				isTest ? "walletStateTest" : "walletState",
				JSON.stringify(walletS)
			);
		},
		removeItem: function(hashid) {
			if (!hashid) {
				return;
			}
			var isTest = this.checkTest();
			var walletS = isTest
				? local.getItem("walletStateTest")
				: local.getItem("walletState");
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
			local.setItem(
				isTest ? "walletStateTest" : "walletState",
				JSON.stringify(list)
			);
		},
		checkItem: function(address) {
			if (!address) {
				return false;
			}
			var isTest = this.checkTest();
			var walletS = isTest
				? local.getItem("walletStateTest")
				: local.getItem("walletState");
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
