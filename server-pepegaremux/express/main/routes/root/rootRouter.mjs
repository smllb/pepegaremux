import express from "express";
import io from 'socket.io-client';

const socket = io('http://localhost:3967');

const rootRouter = express.Router();

rootRouter.get('/' , async (req, res) => {
    console.log("ok ")
    res.sendStatus(200)
})

export default rootRouter;
