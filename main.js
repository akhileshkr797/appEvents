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
})