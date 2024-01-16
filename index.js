const { app, BrowserWindow } = require('electron')
const path = require("path");
const fs = require("fs");
const { ipcMain, dialog } = require('electron');


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
      height: 600,
      icon: './pepeicon.ico',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        sandbox: true
      }
    })
    win.loadFile('index.html')
    return win
  }

  app.whenReady().then(() => {
    let win = createWindow()
    
    let react = false, express = false, socketio = false;
    const checkDependencies = (win) => {
      fetch('http://127.0.0.1:3000')
      .then( (reactReponse) => {
        react = reactReponse.ok ? true : false;
        fetch('http://127.0.0.1:3969')
          .then( (expressReponse) => {
            express = expressReponse.ok ? true : false;
            fetch('http://127.0.0.1:3967')
              .then( (socketioReponse) => {
                socketio = socketioReponse.ok ? true : false;
              })
            .catch( (socketioErr) => {
              console.error(socketioErr)
            })
          })
          .catch((expressErr) => {
            console.error(expressErr)
          })
      })
      .catch((reactErr) =>{
        console.error(reactErr)
      });

      if (react && express && socketio) {
        win.loadURL("http://localhost:3000")
        console.log("all servers are up")
        return
      }
      console.log(`react status: ${react} | express status: ${express} | socketio status: ${socketio}`)
      setTimeout(() => checkDependencies(win), 2500)

    }

    checkDependencies(win)
  })



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

