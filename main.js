'use strict';


const fs = require('fs');
const nconf = require('nconf');
const authorfile = nconf.file({
  file: 'author.json'
});
const electron = require('electron');
const ipcMain = electron.ipcMain;

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
/**
 * 接收登录消息记录到本地
 * @param  {[type]} event [description]
 * @param  {[type]} arg)  {             const authorinfo [description]
 * @return {[type]}       [description]
 */
/*ipcMain.on('loginsuccess', function(event, arg) {
  const authorinfo = JSON.parse(arg);
  authorfile.set('islogin', true);
  authorfile.set('user', {
    accesstoken: authorinfo.accesstoken,
    avatar_url: authorinfo.avatar_url,
    loginname: authorinfo.loginname,
  });
  authorfile.save(function() {

  })
})*/

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});