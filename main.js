const { app, BrowserWindow } = require('electron');
const remote = require('@electron/remote/main');
const path = require('path');
const fs = require('fs');

remote.initialize();

function getIconPath() {
  const devPath = path.join(__dirname, 'icon.ico');
  if (fs.existsSync(devPath)) return devPath;
  const resPath = path.join(process.resourcesPath, 'icon.ico');
  if (fs.existsSync(resPath)) return resPath;
  return devPath;
}

const appIcon = getIconPath();

let splashWindow;
let mainWindow;

function createSplash() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 280,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: appIcon
  });

  splashWindow.loadFile('splash.html');
  splashWindow.center();

  splashWindow.webContents.on('did-finish-load', () => {
    startLoading();
  });
}

function sendSplash(channel, data) {
  if (splashWindow && !splashWindow.isDestroyed()) {
    splashWindow.webContents.send(channel, data);
  }
}

function startLoading() {
  sendSplash('splash-status', 'Initializing...');
  sendSplash('splash-progress', 10);

  setTimeout(() => {
    sendSplash('splash-status', 'Loading modules...');
    sendSplash('splash-progress', 35);
  }, 400);

  setTimeout(() => {
    sendSplash('splash-status', 'Preparing interface...');
    sendSplash('splash-progress', 60);
  }, 900);

  setTimeout(() => {
    sendSplash('splash-status', 'Almost there...');
    sendSplash('splash-progress', 85);
  }, 1400);

  setTimeout(() => {
    sendSplash('splash-progress', 100);
    sendSplash('splash-status', 'Ready!');

    setTimeout(() => {
      createMainWindow();
    }, 1800);
  }, 1900);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    minWidth: 400,
    minHeight: 500,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: appIcon
  });

  remote.enable(mainWindow.webContents);

  mainWindow.loadFile('clone-chat-widget.html');

  mainWindow.webContents.on('did-finish-load', () => {
    if (splashWindow && !splashWindow.isDestroyed()) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createSplash);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplash();
  }
});
