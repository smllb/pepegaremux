const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require("path");
const { ipcMain, dialog } = require('electron');
const writeFiletype = require('./utils/writeFileTypeIntoSettings')

const writeOutputPathToSettings = (outputPath) => {
  console.log("Writing output path to settings: " + outputPath)
  let settingsPath = './settings.json'
  let settings = JSON.parse(fs.readFileSync(settingsPath))
  settings.outputPath = outputPath;
  let updatedSettings = JSON.stringify(settings, null, 2)
  fs.writeFileSync(settingsPath, updatedSettings, 'utf8')
}

const createWindow = () => {
    let win = new BrowserWindow({
      width: 800,
      height: 450,
      icon: './img/pepeicon.png',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        sandbox: true
      }
    })
    win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
    return win
  }

  app.whenReady().then(() => {

    writeFiletype.writeFileTypeIntoSettings('mp3')
    let win = createWindow()

    let servers = {
      "react": "http://127.0.0.1:3000",
      "express": "http://127.0.0.1:3969",
      "socketio": "http://127.0.0.1:3967"
    }
    const checkDependencies = async (win) => {
      const serversStatus = await Promise.all(Object.keys(servers).map( async (key, index) => {
        let response;
        try {
          let serverUrl = Object.values(servers)[index]
          response = await fetch(serverUrl);

        }
        catch(err) {
          console.log(`server ${key} not up yet.`)
        }

        return { name: key, status: response ? response.ok : false }
      }))
      
      const allServersUp = serversStatus.every(server => server.status)
      if (allServersUp) {
        win.loadURL("http://localhost:3000")
        console.log("all servers are up")
        return

      } else {
        console.log(serversStatus.map(server => `${server.name} status: ${server.status}`).join(' | '))
        setTimeout(() => checkDependencies(win), 2500)

      }

    }

    checkDependencies(win)

  })

app.on('window-all-closed', () => {
  console.log('All windows have been closed')
  app.quit()
})

ipcMain.on

ipcMain.on('select-output-folder', async (event) => {
  console.log("Selecting folder path.")
  const result = await dialog.showOpenDialog({
    title: 'Select the output folder',
    defaultPath: `${process.env.USERPROFILE}\\Downloads`,
    message: 'Please select the folder where the files will be saved.',
    properties: ['openDirectory', 'createDirectory']

  });

  if (!result.canceled) {
    let outputPath = result.filePaths[0]
    console.log("Testing " + outputPath)
    console.log(`${result.filePaths[0]} selected.`)
    writeOutputPathToSettings(outputPath)
    
  }

})

