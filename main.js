const { app, BrowserWindow } = require("electron");
const electron = require("electron");
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const Menu = electron.Menu;
const Tray = electron.Tray;
const path = require("path");
const url = require("url");
// const { isBuild } = require("./build.config");
// console.log(isBuild);
// const isBuild = true; //是否编译环境
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
// console.log(process.env.NODE_ENV);

const isDev = process.mainModule.filename.indexOf("app.asar") === -1;

if (isDev) {
	require("electron-reload")(__dirname);
}

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		show: false,
		width: 1440,
		height: 900,
		minHeight: 900,
		minWidth: 1440,
		webPreferences: {
			webSecurity: false
		}
		// titleBarStyle: "hiddenInset"
	});

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
	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});

	win.once("ready-to-show", () => {
		win.show();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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

ipc.on("errorMsg", function(event, text, title) {
	dialog.showErrorBox(text, title);
});
