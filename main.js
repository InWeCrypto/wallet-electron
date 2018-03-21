const {
	app,
	BrowserWindow,
	shell,
	dialog,
	Menu,
	Tray,
	autoUpdater
} = require("electron");
const electron = require("electron");
const cp = require("child_process");
const os = require("os");
const fs = require("fs");
const ipc = electron.ipcMain;

const path = require("path");
const url = require("url");
let win;
const isDev = process.mainModule.filename.indexOf("app.asar") === -1;

if (isDev) {
	//require("electron-reload")(__dirname);
}

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		show: false,
		width: 1240,
		height: 700,
		minHeight: 700,
		minWidth: 1240,
		webPreferences: {
			webSecurity: false
		}
		// titleBarStyle: "hiddenInset"
	});
	setServer();
	if (!isDev) {
		win.loadURL(
			url.format({
				pathname: path.join(__dirname, "resources/index.html"),
				protocol: "file:",
				slashes: true
			})
		);
		win.webContents.openDevTools();
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
	});
	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}
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

var setServer = function() {
	const tmdir = os.tmpdir();
	const dbdir = tmdir + `/inwecryptowallet/appdata/localdb/wallet.db`;
	const sdir = tmdir + `/inwecryptowallet/wallet-service`;
	const cdir = tmdir + `/inwecryptowallet/appdata/wallet.json`;
	const dbf = tmdir + `/inwecryptowallet/appdata`;
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
	let rf = fs.readFileSync(
		path.join(__dirname, "resources/server/wallet-service")
	);
	let sv = fs.writeFileSync(sdir, rf);
	runServer();
};
var runServer = function() {
	const tmdir = os.tmpdir();
	//修改文件执行权限
	var s = fs.chmodSync(tmdir + "/inwecryptowallet/wallet-service", 0o777);
	//数据库目录
	var db = path.join(tmdir, "inwecryptowallet/appdata");
	//启动服务
	cp.exec(tmdir + "/inwecryptowallet/wallet-service -appdir " + db, function(
		e,
		stdout,
		stderr
	) {
		if (e) {
			console.log(e);
		}
		if (!e) {
			console.log(stdout);
			console.log(stderr);
		}
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function() {
	createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// ipc.on("test", function(err, text, title) {
// 	let s = JSON.stringify(fs.readdirSync(path.join(__dirname, "resources")));
// 	dialog.showErrorBox("title", s);
// });
ipc.on("errorMsg", function(event, text, title) {
	dialog.showErrorBox(text, title);
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
