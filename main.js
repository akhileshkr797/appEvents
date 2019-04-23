const electron = require('electron')
const { app, BrowserWindow, webContents, ipcMain, Menu } = electron
const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow, secondWindow

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


function createWindow(fileStr, options) {
    let win = new BrowserWindow(options)

    win.loadURL(url.format({
        pathname: path.join(__dirname, fileStr),
        protocol: 'file:',
        slashes: true
    }))

    win.once('ready-to-show', () => {
        console.log('ready-to-show')
        win.show()
    })

    win.on('close', function(e) {
        console.log('close')
        win = null
    })

    return win

}

app.on('activate', function() {
    console.log('activate')
    if (win == null) {
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
    win = null
})

app.on('window-all-closed', () => {

    console.log('window-all-closed')
    if (process.platform != 'darwin') {
        app.quit()
    }

})

//browser-window-focus
//browser-window-blur
//browser-window-created
//web-contents-created

app.on('browser-window-focus', event => {
    console.log('browser-window-focus:', event.sender.webContents.browserWindowOptions.title)
});

app.on('browser-window-blur', event => {

    console.log('browser-window-blur:', event.sender.webContents.browserWindowOptions.title)

});

app.on('browser-window-created', event => {
    console.log('browser-window-created:')
})

app.on('web-contents-created', event => {
    console.log('web-contents-created:')
})






app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    console.log('ready')

    mainWindow = createWindow('index.html', {
        show: false,
        width: 1000,
        height: 700,
        title: 'mainWindow',
        backgroundColor: '#cde'
    })

    secondWindow = createWindow('about.html', {
        show: false,
        width: 700,
        height: 400,
        title: 'secondWindow',
        backgroundColor: '#cfe'
    })
})