import dotenv from 'dotenv';
dotenv.config();

import { Application, Request, Response } from 'express';
import express from 'express'
import logger from 'morgan';
import cors from 'cors';

import route from './routes';
import dataSource from './models/dataSource';


const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(route);

app.get('/ping', function(req:Request, res : Response){
    res.json({message : 'pong'});
});

const PORT : number = Number(process.env.PORT) || 3000;

app.listen(PORT, async() => {
    await dataSource.initialize()
    .then(()=>{
        console.log('Data Source has been initialized!');
    })
    .catch((err)=>{
        console.error('Error during Data Source initialization : ',err);
    })
    console.log(`server listening on port ${PORT}`);
});
