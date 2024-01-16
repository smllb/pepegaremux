import express from 'express'
import bodyParser from 'body-parser';
import batchRouter from './express/main/routes/batch/batchRoutes.mjs';
import ytdlpRouter from './express/main/routes/ytdlp/ytdlpRoutes.mjs';
import rootRouter from './express/main/routes/root/rootRouter.mjs';
import cors from 'cors'

const app = express()
const port = 3969;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/batch', batchRouter);
app.use('/ytdlp', ytdlpRouter);
app.use('/', rootRouter)
app.listen(port, () => {
    console.log("Express server now running at port " + port);
    
})
