import { Server } from "socket.io";
import { createServer } from 'http';
import { writeFileTypeIntoSettings } from '../../utils/writeFileTypeIntoSettings.js';

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



const port = '3967'

socket.on("connect", (client) => {
    
    console.log("Handshake stablished between parties." + client.id)
    let videoList = {
        list: [],
        
    }; 

    client.on('video', (type) => {
        console.log(`Received ${type} video.`)

    });

    client.on('add-list', (event) => {
        console.log(`event.metadata${event.metadata}`)
        let videoMetadata = JSON.parse(event.metadata)
        // console.log(`event.metadata typeof> ${typeof(event.metadata)}videoMetadata: ${JSON.stringify(videoMetadata)} | typeof ${typeof (videoMetadata)}`)
        
        videoMetadata.forEach(video => video.type = event.urlType)
        console.log(`Adding ${videoMetadata} to list in server.`)

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
        console.log('Disconnected from server');
        
    })

    client.on('download-single-video-request', (event) => {   
        console.log(`download-single-video-request ${JSON.stringify(event, 2, null)}`)    
        const BASE_DOWNLOAD_URL = 'http://localhost:3969/ytdlp/download/single'
        console.log("downloadPointer " + event.downloadPointer)
        let downloadUrl = (`${BASE_DOWNLOAD_URL}/${encodeURIComponent(event.downloadPointer)}/${event.socketId}`)
        console.log("downloadUrl " + downloadUrl)
        let index = videoList.list.findIndex(video => event.videoId === video.id)
        console.log(videoList.list[index].type)
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

