import { Server } from "socket.io";
import { createServer } from 'http';
import { writeFileTypeIntoSettings } from '../../utils/writeFileTypeIntoSettings.js';
import WorkerPoolController  from '../express/controllers/workers/workersPoolController.mjs'

const httpServer = createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Sent status back to client.!\n');
    }
})
const socket = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

let videoList = {
    list: [],
    
}; 

// wrap this into a function in another file 
let poolSize = 6; // will be volatile later 
let workerFilePath = '../server-pepegaremux/express/controllers/workers/workerController.mjs'
let pool = new WorkerPoolController.WorkerPool(poolSize, workerFilePath)

let queue = new WorkerPoolController.TasksQueue(pool)
queue.pool = pool;

// write ports dynamically later to avoid conflict
const port = '3967'

socket.on("connect", (client) => {

    let reactSocketId;
    queue.targetId = reactSocketId;
    console.log("Handshake stablished between parties." + client.id)

    client.on('i-am-react', () => {
        reactSocketId = client.id;
        client.join('react')
        console.log(`[SocketIO-${client.id}] React socket id ${client.id}`)
        console.log(client.rooms)



    })

    client.on('video', (type) => {
        console.log(`Received ${type} video.`)

    });

    client.on('add-list', (event) => {
        console.log(`event.metadata${event.metadata}`)
        let videoMetadata = JSON.parse(event.metadata)
        
        videoMetadata.forEach(video => video.type = event.urlType)
        //console.log(`[SocketIO-${client.id}]Adding ${videoMetadata} to list in server.`)

        if (Array.isArray(videoMetadata)) {
            videoList.list.push(...videoMetadata)

        } else {
            videoList.list.push(videoMetadata);

        }
        client.emit('video-list-length-response', videoList.list.length)

    })

    client.on('video-list-update-request', () => {
        console.log(`video-list-update-request`)
        let response = videoList.list
        console.log(`Sending entire videoList.list back to client.`)
        client.emit('video-list-update-response', videoList.list)

    })

    client.on('remove-video-request', (videoId) => {
        console.log(`remove-video with index ${videoId}`)  
        videoList.list.splice(videoId, 1)
        client.emit('video-list-update-response', videoList.list)

    })

    client.on('update-filetype-request', (filetype) => {
        writeFileTypeIntoSettings(filetype)

    })

    client.on('disconnect', () => {

        if (client.id === reactSocketId) {
            videoList.list = [];
            
        }
        console.log('Disconnected from server');
        
    })
    client.on('log-list', () => {
        console.log(videoList.list)
    })

    client.on('download-all-videos-request', async ()=> {
        let filteredList = videoList.list.filter(videoMetadata => videoMetadata.status === 'Ready to Download')
        queue.batch = filteredList;
        await queue.sendAllTasksToPool();

    });

    client.on ('update-video-status', (event) => {
        let id = event.metadata.id;
        let status = event.metadata.status;
        //console.log(`[SocketIO-${client.id}] update-video-status with id ${id}`)   
        let index = videoList.list.findIndex(video => id === video.id)

        if (index !== -1) {

            videoList.list[index].status = status;
            client.to('react').emit('video-list-update-response', videoList.list)
        } else {
            console.log(`[SocketIO-${client.id}] No video found with id ${id} at ${JSON.stringify(videoList.list,null,2)}`);
        }

    });

    client.on('download-single-video-request', (event) => {   
        console.log(`[SocketIO-${client.id}] download-single-video-request.`)    
        const BASE_DOWNLOAD_URL = 'http://localhost:3969/ytdlp/download/single'
        let downloadUrl = (`${BASE_DOWNLOAD_URL}/${encodeURIComponent(event.downloadPointer)}/${event.socketId}`)
        console.log("[SocketIO] downloadUrl " + downloadUrl)
        let index = videoList.list.findIndex(video => event.videoId === video.id);
        videoList.list[index].status = 'Downloading...';
        client.emit('video-list-update-response', videoList.list)

        try {
        fetch(downloadUrl, { method: 'GET'})
        .then(response => {
            return response.text()
            
        })
        .then(body => {
            console.log(body)
            const data = JSON.parse(body);
            console.log(data + 'on download-single-video-request completion')
            if (data == 'Downloaded') {
                videoList.list[index].status = data;
                
            } else {
                videoList.list[index].status = 'Error on download.';

            }
            client.emit('video-list-update-response', videoList.list)

        })
        } catch (err) {
        console.err(err)

        }
    })

});

socket.on('connect_error', (error) => {
    console.error(error)

})

httpServer.listen(port, () => { 
    console.log("httpServer/SocketIO listening to port: " + port)

});

