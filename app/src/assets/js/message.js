import imgs from "#/loading.gif";
window.Msg = (function(win, undefined) {
	var defaults = {
		title: "",
		text: "",
		type: "alert",
		sureCallback: null,
		canelCallback: null,
		autoHide: 2000
	};
	function inherits(subType, superType) {
		var f = new Function();
		f.prototype = superType.prototype;
		subType.prototype = new f();
		subType.prototype.constructor = subType;
	}
	function removeElement(_element) {
		var _parentElement = _element.parentNode;
		if (_parentElement) {
			_parentElement.removeChild(_element);
		}
	}
	function setArguments(opts) {
		var toOpts = {};
		if (typeof opts != "string" && typeof opts != "object") {
			throw new Error("参数类型错误");
		}
		if (typeof opts === "string") {
			toOpts.text = opts;
		}
		if (typeof opts === "object") {
			toOpts = opts;
		}
		return toOpts;
	}
	var Message = function(opts) {
		this.opts = Object.assign({}, defaults, opts);
		this.timeId =
			new Date().getTime() + parseInt(Math.random() * 100000000);
		//renderHtml.call(this);
		//bindEvent.call(this);
		return this;
	};

	var renderHtml = function(content) {
		var type = this.opts.type;
		var text = this.opts.text;
		var str = [];
		var div = document.createElement("div");
		div.id = "messageBox_" + this.timeId;
		str.push("<div class='glob-message'>");
		str.push(content.call(this));
		// if (type !== "prompt") {
		// 	str.push("        <div class='glob-message-bg'></div>");
		// }
		//str.push("        <div class='glob-message-cont'>");
		// if (type !== "prompt") {
		// 	str.push("            <div class='glob-message-container'>");
		// 	str.push(
		// 		"<div class='glob-message-close' id='globMessageCloseBtn_" +
		// 			this.timeId +
		// 			"'><i class='icon-close'></i></div>"
		// 	);
		// 	str.push(
		// 		"                <div class='glob-message-text'>" +
		// 			text +
		// 			"</div>"
		// 	);

		// 	str.push("                <div class='global-message-btn'>");
		// 	if (type === "alert") {
		// 		str.push(
		// 			"                    <span class='btn sure' id='alertBtn_" +
		// 				this.timeId +
		// 				"'>确定</span>"
		// 		);
		// 	}
		// 	if (type === "confirm") {
		// 		str.push(
		// 			"                    <span class='btn cannel' id='confirmCannelBtn_" +
		// 				this.timeId +
		// 				"'>取消</span>"
		// 		);
		// 		str.push(
		// 			"                    <span class='btn sure' id='confirmSureBtn_" +
		// 				this.timeId +
		// 				"'>确定</span>"
		// 		);
		// 	}
		// 	str.push("                </div>");
		// 	str.push("            </div>");
		// } else {
		// 	str.push(
		// 		"            <div class='glob-message-warn'>" + text + "</div>"
		// 	);
		// }
		// str.push("        </div>");
		str.push("    </div>");
		document.body.appendChild(div);
		document.querySelector(
			"#messageBox_" + this.timeId
		).innerHTML = str.join("");
	};
	var bindEvent = function(callback) {
		var timeId = this.timeId;
		var type = this.opts.type;
		if (type !== "prompt") {
			document.querySelector(
				"#globMessageCloseBtn_" + timeId
			).onclick = function() {
				this.hide();
			}.bind(this);
		}
		callback.call(this);
	};
	Message.prototype = {
		constructor: Message,
		show: function() {
			console.log(111);
		},
		hide: function() {
			removeElement(document.querySelector("#messageBox_" + this.timeId));
		}
	};
	var alertMessage = function(opts) {
		var opts = Object.assign({}, opts, { type: "alert" });
		var text = opts.text;
		Message.call(this, opts);
		renderHtml.call(this, function() {
			var str = [];
			str.push("        <div class='glob-message-bg'></div>");
			str.push("        <div class='glob-message-cont'>");
			str.push("            <div class='glob-message-container'>");
			str.push(
				"<div class='glob-message-close' id='globMessageCloseBtn_" +
					this.timeId +
					"'><i class='icon-close'></i></div>"
			);
			str.push("<div class='glob-message-text'>" + text + "</div>");

			str.push("<div class='global-message-btn'>");
			str.push(
				"                    <span class='btn sure' id='alertBtn_" +
					this.timeId +
					"'>确定</span>"
			);
			str.push("                </div>");
			str.push("            </div>");
			str.push("        </div>");
			return str.join("");
		});
		bindEvent.call(this, function() {
			var timeId = this.timeId;
			document.querySelector("#alertBtn_" + timeId).onclick = function() {
				this.hide();
			}.bind(this);
		});
		return this;
	};
	var confirmMessage = function(opts) {
		var opts = Object.assign({}, opts, { type: "confirm" });
		var text = opts.text;
		Message.call(this, opts);
		renderHtml.call(this, function() {
			var str = [];
			str.push("        <div class='glob-message-bg'></div>");
			str.push("        <div class='glob-message-cont'>");
			str.push("            <div class='glob-message-container'>");
			str.push(
				"<div class='glob-message-close' id='globMessageCloseBtn_" +
					this.timeId +
					"'><i class='icon-close'></i></div>"
			);
			str.push("<div class='glob-message-text'>" + text + "</div>");

			str.push("<div class='global-message-btn'>");
			str.push(
				" <span class='btn cannel' id='confirmCannelBtn_" +
					this.timeId +
					"'>取消</span>"
			);
			str.push(
				"<span class='btn sure' id='confirmSureBtn_" +
					this.timeId +
					"'>确定</span>"
			);
			str.push("                </div>");
			str.push("            </div>");
			str.push("        </div>");
			return str.join("");
		});
		bindEvent.call(this, function() {
			var timeId = this.timeId;
			document.querySelector(
				"#confirmCannelBtn_" + timeId
			).onclick = function() {
				if (typeof this.opts.canelCallback === "function") {
					this.opts.canelCallback();
				}
				this.hide();
			}.bind(this);
			document.querySelector(
				"#confirmSureBtn_" + timeId
			).onclick = function() {
				if (typeof this.opts.sureCallback === "function") {
					this.opts.sureCallback();
				}
				this.hide();
			}.bind(this);
		});
		return this;
	};
	var promptMessage = function(opts) {
		var opts = Object.assign({}, opts, { type: "prompt" });
		Message.call(this, opts);
		renderHtml.call(this, function() {
			var str = [];
			str.push("        <div class='glob-message-cont'>");
			str.push("<div class='glob-message-warn'>" + opts.text + "</div>");
			str.push("        </div>");
			return str.join("");
		});
		bindEvent.call(this, function() {
			var timeId = this.timeId;
			if (typeof this.opts.autoHide === "number") {
				var _this = this;
				var timer = null;
				timer = setTimeout(
					function() {
						removeElement(
							document.querySelector(
								"#messageBox_" + _this.timeId
							)
						);
					}.bind(this),
					this.opts.autoHide
				);
			}
		});
		return this;
	};
	var loadMessage = function(opts) {
		var opts = Object.assign({}, opts, { type: "load" });
		Message.call(this, opts);
		renderHtml.call(this, function() {
			var str = [];
			str.push("        <div class='glob-message-bg'></div>");
			str.push("        <div class='glob-message-cont'>");
			str.push(
				"<div class='glob-message-load'><div><img class='loadimg' src='" +
					imgs +
					"'></div><div class='loading-text'>" +
					opts.text +
					"</div></div>"
			);
			str.push("        </div>");
			return str.join("");
		});
		return this;
	};
	inherits(alertMessage, Message);
	inherits(confirmMessage, Message);
	inherits(promptMessage, Message);
	inherits(loadMessage, Message);
	return {
		alert: function(opts) {
			var toOpts = setArguments(opts);
			return new alertMessage(toOpts);
		},
		confirm: function(opts) {
			var toOpts = setArguments(opts);
			return new confirmMessage(toOpts);
		},
		prompt: function(opts) {
			var toOpts = setArguments(opts);
			return new promptMessage(toOpts);
		},
		load: function(opts) {
			var toOpts = setArguments(opts);
			return new loadMessage(toOpts);
		}
	};
})(window);
