const fs = require("fs");
const os = require("os")
const path = require("path")

const writeFileTypeIntoSettings = (filetype, settingsPath) => {
    if (!settingsPath) {
        settingsPath = './settings.json'
    } 
    

    if (fs.existsSync(settingsPath)) {
        console.log("Writing filetype into settings: " + filetype)
        let settings = JSON.parse(fs.readFileSync(settingsPath))
        settings.filetype = filetype;
        let updatedSettings = JSON.stringify(settings, null, 2)
        fs.writeFileSync(settingsPath, updatedSettings, 'utf8')

    } else {

        let defaultSettings = {
            filetype: "mp3",
            outputPath: path.join(os.homedir(), 'Music', 'PepegaRemux')
        }
        
        fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2))

    }

}


module.exports =  {
    writeFileTypeIntoSettings
}