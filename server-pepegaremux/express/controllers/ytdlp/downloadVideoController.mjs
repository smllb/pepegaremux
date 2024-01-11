import  { exec } from 'child_process' 
import settings from '../../../../settings.json' assert { type: 'json'}
import readFromSettings from './readFromSettingsController.mjs';

const downloadVideo = async (id) => {
    let downloadCommand = '';
    let filetype = await readFromSettings('filetype')
    let outputPath = await readFromSettings('outputPath')
    console.log(`downloadVideo filetype: ${filetype}`)
    switch (filetype) {
        case 'mp4':
        downloadCommand = `yt-dlp -o "${outputPath}/%(title)s.%(ext)s" -S ext "${id}"`
        break;
        case 'webm':
        downloadCommand = `yt-dlp -o "${outputPath}/%(title)s.%(ext)s" "${id}"`
        break;
        default: 
        downloadCommand = `yt-dlp -o "${outputPath}/%(title)s.%(ext)s" -x --audio-format ${filetype} --audio-quality 0 "${id}"`

    }

    let downloadResult = new Promise((resolve, reject) => {
        try {
            return exec(downloadCommand, (error, stdout, stderr) => {
                console.log("starting")
                if (error || stderr) {
                    console.log(error || stderr)
                    reject('Error on download.')
                    return;

                }
            //console.log('finished ' + stdout)

            resolve('Downloaded')

            })
        } catch (err) {
    
        }
    })

    try {
        let result = await downloadResult;
        return JSON.stringify(result)
    } catch (err) {
        console.error(err);
        return null;
    }
    
    
    
}

export default downloadVideo;
