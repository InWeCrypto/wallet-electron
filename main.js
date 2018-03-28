const { app, BrowserWindow, shell, dialog, Menu, Tray } = require("electron");
const autoUpdater = require("electron-updater").autoUpdater;
const electron = require("electron");
const cp = require("child_process");
const os = require("os");
const fs = require("fs");
const log = require("electron-log");
const ipc = electron.ipcMain;
const path = require("path");
const url = require("url");
//创建文件路径
var createFolder = function(to) {
	var sep = path.sep;
	var folders = path.dirname(to).split(sep);
	var p = "";
	while (folders.length) {
		p += folders.shift() + sep;
		if (!fs.existsSync(p)) {
			fs.mkdirSync(p);
		}
	}
};
var setLanguage = function(lng) {
	const tmdir = os.tmpdir();
	const area = app.getLocale();
	const langDir = path.join(tmdir, "inwecryptowallet/app.config.json");
	const cfIsexit = fs.existsSync(langDir);
	if (!cfIsexit) {
		createFolder(langDir);
		let cfg = {};
		if (area.indexOf("zh-")) {
			cfg.lang = "zh";
		} else {
			cfg.lang = "en";
		}
		fs.writeFileSync(langDir, JSON.stringify(cfg), "utf8");
	} else {
		let cfg = JSON.parse(fs.readFileSync(langDir, "utf8"));
		if (lng) {
			cfg.lang = lng;
		}
		if (!cfg.lang) {
			if (area.indexOf("zh-")) {
				cfg.lang = "zh";
			} else {
				cfg.lang = "en";
			}
		}
		fs.writeFileSync(langDir, JSON.stringify(cfg), "utf8");
	}
};
var getLanguage = function() {
	const tmdir = os.tmpdir();
	const langDir = path.join(tmdir, "inwecryptowallet/app.config.json");
	const cfIsexit = fs.existsSync(langDir);
	if (!cfIsexit) {
		return "zh";
	}
	let cfg = JSON.parse(fs.readFileSync(langDir, "utf8"));
	if (!cfg.lang) {
		return "zh";
	}
	return cfg.lang;
};
setLanguage();
let win,
	service,
	lng = getLanguage();
const isDev = process.mainModule.filename.indexOf("app.asar") === -1;
let menuText = function() {
	var res = null;
	if (lng == "zh") {
		res = {
			edit: "编辑",
			revoke: "撤销",
			redo: "重做",
			shear: "剪切",
			copy: "复制",
			paste: "粘贴",
			selectAll: "全选",
			view: "查看",
			reload: "重载",
			fullscreen: "切换全屏",
			toggleDev: "切换开发者工具",
			window: "窗口",
			minimize: "最小化",
			close: "关闭",
			reopen: "重新打开窗口",
			help: "帮助",
			language: "语言",
			chinese: "中文",
			english: "English",
			readMore: "了解更多",
			network: "网络",
			formal: "正式网",
			test: "测试网",
			about: "关于",
			services: "服务",
			hide: "隐藏",
			hideother: "隐藏其他",
			showAll: "显示全部",
			quit: "退出"
		};
	} else {
		res = {
			edit: "Edit",
			revoke: "Revoke",
			redo: "Redo",
			shear: "Shear",
			copy: "Copy",
			paste: "Paste",
			selectAll: "Select All",
			view: "View",
			reload: "Reload",
			fullscreen: "Full Screen",
			toggleDev: "Toggle Developer Tools",
			window: "Window",
			minimize: "Minimize",
			close: "Close",
			reopen: "Reopen",
			help: "Help",
			language: "Language",
			chinese: "中文",
			english: "English",
			readMore: "Learn More",
			network: "Network",
			formal: "Formal Network",
			test: "Test Network",
			about: "About",
			services: "Services",
			hide: "Hide",
			hideother: "Hide Other",
			showAll: "Show All",
			quit: "Quit"
		};
	}
	return res;
};
let text = menuText();
let template = [
	{
		label: text.edit,
		submenu: [
			{
				label: text.revoke,
				accelerator: "CmdOrCtrl+Z",
				role: "undo"
			},
			{
				label: text.redo,
				accelerator: "Shift+CmdOrCtrl+Z",
				role: "redo"
			},
			{
				type: "separator"
			},
			{
				label: text.shear,
				accelerator: "CmdOrCtrl+X",
				role: "cut"
			},
			{
				label: text.copy,
				accelerator: "CmdOrCtrl+C",
				role: "copy"
			},
			{
				label: text.paste,
				accelerator: "CmdOrCtrl+V",
				role: "paste"
			},
			{
				label: text.selectAll,
				accelerator: "CmdOrCtrl+A",
				role: "selectall"
			}
		]
	},
	{
		label: text.view,
		submenu: [
			{
				label: text.reload,
				accelerator: "CmdOrCtrl+R",
				click: function(item, focusedWindow) {
					if (focusedWindow) {
						if (focusedWindow.id === 1) {
							BrowserWindow.getAllWindows().forEach(function(
								win
							) {
								if (win.id > 1) {
									win.close();
								}
							});
						}
						focusedWindow.reload();
					}
				}
			},
			{
				label: text.fullscreen,
				accelerator: (function() {
					if (process.platform === "darwin") {
						return "Ctrl+Command+F";
					} else {
						return "F11";
					}
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.setFullScreen(
							!focusedWindow.isFullScreen()
						);
					}
				}
			}

			// 	 {
			// 			label: text.toggleDev,
			// 			accelerator: (function() {
			// 				if (process.platform === "darwin") {
			// 					return "Alt+Command+I";
			// 				} else {
			// 					return "Ctrl+Shift+I";
			// 				}
			// 			})(),
			// 			click: function(item, focusedWindow) {
			// 				if (focusedWindow) {
			// 					focusedWindow.toggleDevTools();
			// 				}
			// 			}
			// 	  }
		]
	},
	{
		label: text.window,
		role: "window",
		submenu: [
			{
				label: text.minimize,
				accelerator: "CmdOrCtrl+M",
				role: "minimize"
			},
			{
				label: text.close,
				accelerator: "CmdOrCtrl+W",
				role: "close"
			},
			{
				type: "separator"
			},
			{
				label: text.reopen,
				accelerator: "CmdOrCtrl+Shift+T",
				enabled: false,
				key: "reopenMenuItem",
				click: function() {
					app.emit("activate");
				}
			}
		]
	},
	{
		label: text.help,
		submenu: [
			{
				label: text.language,
				submenu: [
					{
						label: text.chinese,
						type: "radio",
						checked: true,
						click: function() {
							win.webContents.send("changeLng", "zh");
							setLanguage("zh");
							lng = "zh";
							app.relaunch();
							app.exit(0);
						}
					},
					{
						label: text.english,
						type: "radio",
						checked: false,
						click: function() {
							win.webContents.send("changeLng", "en");
							setLanguage("en");
							lng = "zh";
							app.relaunch();
							app.exit(0);
						}
					}
				]
			},
			{
				type: "separator"
			},
			{
				label: text.readMore,
				click: function() {
					electron.shell.openExternal("http://inwecrypto.com");
				}
			}
		]
	},
	{
		label: text.network,
		submenu: [
			{
				label: text.formal,
				click: function() {
					win.webContents.send("changeNetwork", "formal");
				},
				type: "radio",
				checked: true
			},
			{
				label: text.test,
				click: function() {
					win.webContents.send("changeNetwork", "test");
				},
				type: "radio",
				checked: false
			}
		]
	}
];

if (process.platform === "darwin") {
	const name = "InWeCrypto";
	template.unshift({
		label: name,
		submenu: [
			{
				label: `${text.about} ${name}`,
				role: "about"
			},
			{
				type: "separator"
			},
			{
				label: text.services,
				role: "services",
				submenu: []
			},
			{
				type: "separator"
			},
			{
				label: `${text.hide} ${name}`,
				accelerator: "Command+H",
				role: "hide"
			},
			{
				label: text.hideother,
				accelerator: "Command+Alt+H",
				role: "hideothers"
			},
			{
				label: text.showAll,
				role: "unhide"
			},
			{
				type: "separator"
			},
			{
				label: text.quit,
				accelerator: "Command+Q",
				click: function() {
					app.quit();
				}
			}
		]
	});
}

var setServer = function() {
	const tmdir = os.tmpdir();
	const dbdir = path.join(
		tmdir,
		`/inwecryptowallet/appdata/localdb/wallet.db`
	);
	let sdir = "";
	if (process.platform == "darwin") {
		sdir = path.join(tmdir, `/inwecryptowallet/wallet-service`);
	} else {
		sdir = path.join(tmdir, `/inwecryptowallet/wallet-service.exe`);
	}
	const cdir = path.join(tmdir, `/inwecryptowallet/appdata/wallet.json`);
	const dbf = path.join(tmdir, `/inwecryptowallet/appdata`);
	const isExit = fs.existsSync(dbdir);
	if (!isExit) {
		let db = fs.readFileSync(
			path.join(__dirname, "resources/server/appdata/localdb/wallet.db")
		);
		createFolder(dbdir);
		let wdb = fs.writeFileSync(dbdir, db);
	}
	//复制JSON到本地目录
	let cf = fs.readFileSync(
		path.join(__dirname, "resources/server/appdata/wallet.json")
	);
	let cfj = fs.writeFileSync(cdir, cf);
	//复制service到本地目录
	let rf;
	if (process.platform == "darwin") {
		rf = fs.readFileSync(
			path.join(__dirname, "resources/server/wallet-service")
		);
	} else {
		rf = fs.readFileSync(
			path.join(__dirname, "resources/server/wallet-service.exe")
		);
	}
	let sv = fs.writeFileSync(sdir, rf);
	runServer();
};
var runServer = function() {
	var tmdir = os.tmpdir();
	//修改文件执行权限
	if (process.platform == "darwin") {
		var s = fs.chmodSync(
			path.join(tmdir, "/inwecryptowallet/wallet-service"),
			0o777
		);
	} else {
		var s = fs.chmodSync(
			path.join(tmdir, "/inwecryptowallet/wallet-service.exe"),
			0o777
		);
	}
	//数据库目录
	var db = path.join(tmdir, "inwecryptowallet/appdata");
	//启动服务
	service = cp.exec(
		tmdir + "/inwecryptowallet/wallet-service -appdir " + db,
		function(err) {
			if (err) {
				console.log(err);
			}
		}
	);
	createWindow();
};

ipc.on("errorMsg", function(event, text, title) {
	dialog.showErrorBox(text, title);
});
ipc.on("openWeb", function(event, arg) {
	if (!arg || !arg.url || arg.url.length <= 0) {
		dislog.showErrorBox(
			lng == "en" ? "the url is not found" : "没有链接地址"
		);
		return;
	}
	electron.shell.openExternal(`${arg.url}`);
});
//初始化显示正式网络
ipc.on("loadNetwok", function(event, type) {
	if (type == "formal") {
		template[template.length - 1].submenu[0].checked = true;
		template[template.length - 1].submenu[1].checked = false;
	}
	if (type == "test") {
		template[template.length - 1].submenu[0].checked = false;
		template[template.length - 1].submenu[1].checked = true;
	}
});
ipc.on("print-preview", (event, arg) => {
	winprintp = new BrowserWindow({ width: 790, height: 800 });
	winprintp.loadURL(
		"file:///" +
			path.join(
				__dirname,
				`resources/index.html#print?str=${arg.str}&title=${arg.title}`
			)
	);
	winprintp.setMenu(null);
	winprintp.webContents.on("did-finish-load", () => {
		winprintp.webContents.send("request", arg);
	});
});
ipc.on("print-to-pdf", function(event, arg) {
	const pdfPath = path.join(
		os.tmpdir(),
		`${arg.title}_${parseInt(Math.random() * 100000000, 10)}.pdf`
	);
	const win = BrowserWindow.fromWebContents(event.sender);
	win.webContents.printToPDF({}, function(error, data) {
		if (error) throw error;
		dialog.showSaveDialog(
			{
				title: "save",
				defaultPath: pdfPath
			},
			function(res) {
				if (res && res.length > 0) {
					fs.writeFileSync(res, data);
					shell.openExternal("file://" + pdfPath);
				}
			}
		);
	});
});
ipc.on("exportJSON", function(event, arg) {
	let name = `${arg.title}_${parseInt(Math.random() * 100000000, 10)}`;
	dialog.showSaveDialog(
		{
			title: "save",
			defaultPath: path.join(os.tmpdir(), `${name}.json`),
			nameFieldLabel: `${name}.json`
		},
		function(res) {
			if (res && res.length > 0) {
				fs.writeFileSync(res, arg.data);
				shell.openExternal("file://" + res);
			}
		}
	);
});

var sendStatus = function(text) {
	return dialog.showMessageBox({
		title: "message",
		message: text
	});
};
var updateHandler = function() {
	autoUpdater.on("checking-for-update", () => {
		//sendStatus("Checking for update...");
	});
	autoUpdater.on("update-available", (ev, info) => {
		// sendStatus(
		// 	`Update available.${JSON.stringify(ev)}${JSON.stringify(info)}`
		// );
	});
	autoUpdater.on("update-not-available", (ev, info) => {
		// sendStatus(
		// 	`Update not available.${JSON.stringify(ev)}${JSON.stringify(info)}`
		// );
	});
	autoUpdater.on("error", (ev, err) => {
		//sendStatus(`Error in auto-updater.${JSON.stringify(ev)}`);
	});
	autoUpdater.on("download-progress", (ev, progressObj) => {
		//sendStatus(`Download progress ${JSON.stringify(progressObj)}`);
	});
	autoUpdater.on("update-downloaded", (ev, info) => {
		sendStatus(
			lng == "en"
				? `you has an update,the app will restart to update`
				: "你有一个更新，请重启"
		);
		setTimeout(function() {
			autoUpdater.quitAndInstall();
			createWindow();
		}, 2000);
	});
	// Wait a second for the window to exist before checking for updates.
	setTimeout(function() {
		autoUpdater.checkForUpdates();
	}, 1000);
};
function createWindow() {
	var windowParam = {
		show: false,
		width: 1080,
		height: 800,
		minHeight: 1080,
		minWidth: 800,
		webPreferences: {
			webSecurity: false
		}
	};
	if (!isDev) {
		windowParam.titleBarStyle = "hiddenInset";
	}
	win = new BrowserWindow(windowParam);
	if (!isDev) {
		win.loadURL(
			url.format({
				pathname: path.join(__dirname, "resources/index.html"),
				protocol: "file:",
				slashes: true
			})
		);
	} else {
		win.loadURL(
			url.format({
				pathname: path.join(__dirname, "resources/index.html"),
				protocol: "file:",
				slashes: true
			})
		);
		win.webContents.openDevTools();
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS
		} = require("electron-devtools-installer");
		installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
			.then(name => console.log(`Added Extension:  ${name}`))
			.catch(err => console.log("An error occurred: ", err));
	}
	win.once("ready-to-show", () => {
		win.show();
		if (!isDev) {
			updateHandler();
		}
		win.webContents.send("changeLng", lng);
		if (lng == "zh") {
			template[template.length - 2].submenu[0].submenu[0].checked = true;
			template[template.length - 2].submenu[0].submenu[1].checked = false;
		} else {
			template[template.length - 2].submenu[0].submenu[0].checked = false;
			template[template.length - 2].submenu[0].submenu[1].checked = true;
		}

		const menu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);
	});
	// Emitted when the window is closed.
	win.on("closed", () => {
		service.kill();
		win = null;
	});
}

// Some APIs can only be used after this event occurs.
app.on("ready", function() {
	setServer();
});
// Quit when all windows are closed.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
app.on("activate", () => {
	if (win === null) {
		setServer();
	}
});
