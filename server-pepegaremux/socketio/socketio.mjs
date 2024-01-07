import { Server } from "socket.io";
import { createServer } from 'http';

const httpServer = createServer()
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

    client.on('add-list', (video) => {
        
        let videoMetadata = JSON.parse(video)
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
      console.log(`remove-video with id ${videoId}`)  
      videoList.list = videoList.list.filter(video => video.id !== videoId)
      client.emit('video-list-update-response', videoList.list)
    })

});

socket.on('connect_error', (error) => {
    console.error(error)

})


socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
httpServer.listen(port, () => { 
    console.log("httpServer/SocketIO listening to port: " + port)

});