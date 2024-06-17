import express , { Request , Response } from 'express';
import 'dotenv/config';
import connectToDB from './database/db';
import mongoose from 'mongoose';

const PORT = process.env.PORT;
const app = express();

connectToDB(process.env.MONGODB_URL!);
mongoose.connection.once('open',() =>{
    app.listen(PORT,()=>{
        console.log(`Server started on PORT NUMBER : ${PORT}`);
    })
})

