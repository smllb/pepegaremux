import buildPrintCommand from "./buildPrintCommandController.mjs"
import  { exec } from 'child_process' 
const getYoutubeMetadata = (url) => {

    const printCommand = buildPrintCommand(url, ['--encoding utf8 --print'], ['title', 'duration_string', 'uploader', 'availability', 'thumbnail', 'id'])
    
    let metadata = new Promise ((resolve, reject) => {
        const status = 'Ready to Download'

        try {
            return exec(printCommand, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.error(`exec stderr: ${stderr}`)
                    let stderrOutput = stderr.split('\n');
                    console.error(`exec error: ${error}`)
                    resolve( [{title: "Error on URL", status: stderrOutput, url: url }])
                    
                }

                const videos = stdout.split('\n').filter(str => str);
                const videosMetadata = videos.map(video => {
                    const [title, duration_string, uploader, availability, thumbnail, id] = video.split('\t').filter(str => str);
                    
                    return { title, duration_string, uploader, availability, thumbnail, id, status, url}
        
                })
                
                
                resolve(videosMetadata)
                 
                
            })
        } catch (err) {
            console.error("logging err" + err)
            reject(err)
        }
    })


    return metadata
    
}

export default getYoutubeMetadata;