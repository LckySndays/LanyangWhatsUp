if (require('electron-squirrel-startup')) return;

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const autoUpdater = electron.autoUpdater

const remote = electron.remote;
const dialog = electron.dialog;

const os = require('os');
const get = require('simple-get');

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};

// autoUpdater.on('update-downloaded', function () {
    // autoUpdater.quitAndInstall()
// });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function initUpdates(){
    var platform = os.platform() + '_' + os.arch();
    let version = app.getVersion();

    if(os.platform() == "win32"){
      if(os.arch() == "x64"){
        platform = "win64";
      }else{
        platform = "win32";
      }
    }

    if(process.platform === 'linux'){
      get.concat("https://update-whatsup.herokuapp.com/update/linux/" + version, (err, res, data) => {
      
          if (res.statusCode === 200) {
            
            data = JSON.parse(data);

            if(versionCompare(version, data.name) < 0){
              
              var index = dialog.showMessageBox({
                  type: "info",
                  buttons: ["Download Now", "Download Later"],
                  title: "Lanyang WhatsUp",
                  message: "Update Available for Linux (" + data.name + ")",
                  detail: ""
              });

              if(index === 0){
		let win = new BrowserWindow({show: false});
                win.loadURL(data.url);
              }

            }

          } else if (res.statusCode === 204) {
            // No update available
          } else {
            // Unexpected status code
            //log(`Update error: Unexpected status code: ${res.statusCode}`)
          }
      
      });
      return;
    }

    autoUpdater.setFeedURL('https://update-whatsup.herokuapp.com/update/' + platform + '/' + version);
    //autoUpdater.setFeedURL("https://update-whatsup.herokuapp.com/update/darwin_x64/0.1.0");
    

    //autoUpdater.on('checking-for-update', () => {
        //...
        //dialog.showErrorBox("Test", "Content")
      
    //});
    
    //autoUpdater.on('update-available', () => {
        //...
    //});
    
    //autoUpdater.on('update-not-available', () => {
        //...
    //});

    autoUpdater.on('update-downloaded', () => {
        //...
        var index = dialog.showMessageBox(mainWindow, {
            type: "info",
            buttons: ["Restart Now", "Restart Later"],
            title: "Lanyang WhatsUp",
            message: "New Version has been Downloaded",
            detail: "The new version has been downloaded. Please restart the application to apply the updates."
        });
        
        if(index === 0){
            autoUpdater.quitAndInstall()
        }
       
    });
    
    autoUpdater.on('error', (error) => {
        dialog.showErrorBox("Error", error)
    });

    autoUpdater.checkForUpdates();
    
}

function createWindow () {

  if(process.argv[1] != "--squirrel-firstrun"){
        var index = dialog.showMessageBox({
            type: "info",
            buttons: ["Check Update Now", "Check Update Later"],
            title: "Lanyang WhatsUp",
            message: "Do you want to check for Update?",
            detail: "This app will auto download the update if it is available"
        });
        
        if(index === 0){
            initUpdates();
        }

    }
   
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1280, height: 768, frame: false})

  // and load the index.html of the app.Lanyang-Chat
  //mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.loadURL(`file://${__dirname}/index-local.html`)
  //mainWindow.loadURL(`http://localhost/IIT-Project/#/`)
  //mainWindow.loadURL(`https://chats.lanyang.tk`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  
  mainWindow.setIgnoreMouseEvents(false);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}
