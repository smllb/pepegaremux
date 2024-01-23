import { parentPort, threadId } from 'worker_threads'

parentPort.on('download', async (videoData) => {
    let download = {
        result: await downloadVideo(videoData),
        workerId: threadId
    }
    
    parentPort.postMessage(download)
    
})