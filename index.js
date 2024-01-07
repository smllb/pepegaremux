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
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        enableRemoteModule: false,
        contextIsolation: true,
        sandbox: true
      }
    })
  
    win.loadURL('http://localhost:3000');
  }

  app.whenReady().then(() => {
    createWindow()
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

