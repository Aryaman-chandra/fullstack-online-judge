import express , { Request , Response } from 'express';
import 'dotenv/config';
import connectToDB from './db';
import mongoose from 'mongoose';
import Cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import { errorHandler } from './middlewares/errorHandler';
const PORT = process.env.PORT;
const app = express();


//middlewares
app.use(Cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//routes
app.use("/auth",authRoutes);
//app.use("/problems",problemRouter);
//app.use("/contests",contestRouter);




connectToDB(process.env.MONGODB_URL!);
mongoose.connection.once('open',() =>{
    app.listen(PORT,()=>{
        console.log(`Server started on PORT NUMBER : ${PORT}`);
    })
})
app.use(errorHandler);
