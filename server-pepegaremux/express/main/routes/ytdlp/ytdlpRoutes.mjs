import express from "express";
import appraiseUrl from "../../../controllers/ytdlp/appraiseUrlController.mjs";
import getYoutubeMetadata from "../../../controllers/ytdlp/getYoutubeMetadataController.mjs";
import downloadVideo from "../../../controllers/ytdlp/downloadVideoController.mjs";
import io from 'socket.io-client';
import settings from '../../../../../settings.json' assert { type: 'json'}

const socket = io('http://localhost:3967');

const ytdlpRouter = express.Router();

ytdlpRouter.get('/metadata/youtube/:url' , async (req, res) => {
    await getYoutubeMetadata(req.params.url)
    .then(result => {
        console.log(JSON.stringify(result))
        res.send(result)
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Internal server error")
    }) 
})

ytdlpRouter.get('/metadata/generic/:url' , async (req, res) => {
    await getYoutubeMetadata(req.params.url) // merge both youtube and generic api later...
    .then(result => {
        console.log(JSON.stringify(result))
        res.send(result)
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Internal server error")
    }) 
})

ytdlpRouter.get('/appraise/:url', (req, res) => {
    appraiseUrl(req.params.url, res)
    .then(result => res.send(result))
    .catch(err => {
        console.log(err)
        res.status(500).send("Internal server error")
    })

})

ytdlpRouter.get('/download/single/:id/:socketId', (req,res) => {
    const id = req.params.id;
    const socketId = req.params.socketId
    downloadVideo(id)
    .then((downloadResult) => {
        socket.emit('download-single-video-response', {targetId: socketId, message: downloadResult})
        res.send(downloadResult)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('Couldnt download video')
    })
    
})

export default ytdlpRouter;
