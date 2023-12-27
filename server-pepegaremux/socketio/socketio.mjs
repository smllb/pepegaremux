import { Server } from "socket.io";
import { createServer } from 'http';

const httpServer = createServer()
const socket = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
const port = '3967'

socket.on("connect", () => {
  console.log("Handshake stablished between parties.")

});

socket.on('connect_error', (error) => {
    console.error(error)

})

httpServer.listen(port, () => { 
    console.log("httpServer/SocketIO listening to port: " + port)

});