import fs from 'fs';

function readFromSettings(property) {
  const settingsPath = '../settings.json'
  const rawData = fs.readFileSync(settingsPath);
  const settings = JSON.parse(rawData)

  switch (property) {
    case 'filetype':
    return settings.filetype;
    case 'outputPath':
    return settings.outputPath;
  }
  
}

//console.log(readFromSettings('filetype'))

export default readFromSettings;