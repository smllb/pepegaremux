import express from "express";
import appraiseUrl from "../../../controllers/ytdlp/appraiseUrlController.mjs";
import getYoutubeMetadata from "../../../controllers/ytdlp/getYoutubeMetadataController.mjs";
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

ytdlpRouter.get('/appraise/:url', (req, res) => {
    appraiseUrl(req.params.url, res)
    .then(result => res.send(result))
    .catch(err => {
        console.log(err)
        res.status(500).send("Internal server error")
    })

})

export default ytdlpRouter;
