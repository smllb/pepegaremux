import { parentPort, threadId } from 'worker_threads'
import io from 'socket.io-client';

const client = io('http://localhost:3967');

parentPort.on('message', async (message) => {
    //same logic as download-single-request, wrap in a function and use it on both later
    console.log(`[Worker ${threadId}] received ${message.videoMetadata.title} | ${message.event}`)
    if (message.event === 'download') {
        console.log(JSON.stringify(message.videoMetadata,null,2))
        
        let videoMetadata = message.videoMetadata;
        let downloadPointer = (videoMetadata.type === 'YOUTUBE' ? videoMetadata.id : videoMetadata.url)
        
        const BASE_DOWNLOAD_URL = 'http://localhost:3969/ytdlp/download/single'
        let downloadUrl = (`${BASE_DOWNLOAD_URL}/${encodeURIComponent(downloadPointer)}/${message.targetId}`)
        console.log(`[Worker ${threadId}] downloadUrl: ${downloadUrl}`)
        let video = {
            targetId: message.targetId, 
            metadata: {
                id: videoMetadata.id, 
                status: ''
            } 
        }

        try {

        video.metadata.status = 'Downloading...'
        console.log(`[Worker ${threadId}] sending request to download on SocketIO.`)
        client.emit('update-video-status', video)

        fetch(downloadUrl, { method: 'GET'})
        .then(response => {
            return response.text()
            
        })
        .then(body => {
            console.log(body)
            const data = JSON.parse(body);
            console.log(`[Worker ${threadId}] on video download completion with status ${data}`)
            if (data == 'Downloaded') {
                video.metadata.status = data
                client.emit('update-video-status', video)
                
            } else {
                video.metadata.status = 'Error on download.'
                client.emit('update-video-status', video)


            }
            parentPort.postMessage('End of activity');

        })
        } catch (err) {
        console.error(err)

        }
    }
})

