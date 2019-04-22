const electron = require('electron')
const { app, BrowserWindow, webContents, ipcMain, Menu } = electron
const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow

var force_quit = false
let template = [{
    label: 'appEvents',
    submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {
            //force_quit = true
            app.quit()
        }
    }]
}]


function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1000,
        height: 700,
        title: 'appEvents',
        backgroundColor: '#cde'
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.once('ready-to-show', () => {
        console.log('ready-to-show')
        mainWindow.show()
    })

    mainWindow.on('close', function(e) {
        console.log('close')
        mainWindow = null
    })

}

app.on('activate', function() {
    console.log('activate')
    if (mainWindow == null) {
        createWindow()
    }
})

//before-quit, will-quit, quit
app.on('before-quit', function(e) {
    console.log('before-quit')
    force_quit = true
})

app.on('will-quit', function() {
    console.log('will-quit')
    mainWindow = null
})

app.on('window-all-closed', () => {

    console.log('window-all-closed')
    if (process.platform != 'darwin') {
        app.quit()
    }

})




app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    createWindow()
    console.log('ready')
})