const electron = require('electron')
const { app, BrowserWindow, webContents, ipcMain } = electron
const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow


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
        mainWindow.show()
    })

    mainWindow.on('close', function() {
        mainWindow = null
    })

}

app.on('ready', () => {
    createWindow()
    console.log('ready')
})

app.on('window-all-closed', () => {
    app.quit()
    console.log('window-all-closed')
})

app.on('activate', (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        createWindow()
    }
})