import buildPrintCommand from "./buildPrintCommandController.mjs"
import  { exec } from 'child_process' 
const getYoutubeMetadata = (url) => {

    const printCommand = buildPrintCommand(url, ['--print'], ['title', 'duration_string', 'uploader', 'availability', 'thumbnail', 'id'])
    
    let metadata = new Promise ((resolve, reject) => {
        try {
            return exec(printCommand, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.error(`exec error: ${stderr}`)
                    reject(error || stderr)
                    return;
                }

                const videos = stdout.split('\n').filter(str => str);
                const videosMetadata = videos.map(video => {
                    const [title, duration_string, uploader, availability, thumbnail, id] = video.split('\t').filter(str => str);
                    const status = 'Ready to Download'
                    return { title, duration_string, uploader, availability, thumbnail, id, status }
        
                })
                
                
                resolve(videosMetadata)
                 
                
            })
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })


    return metadata
    
}

export default getYoutubeMetadata;