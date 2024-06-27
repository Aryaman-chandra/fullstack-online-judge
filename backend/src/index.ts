import express  from 'express';
import 'dotenv/config';
import connectToDB from './db';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
const PORT = process.env.PORT;
const app = express();
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import problemRoutes from './routes/problem';
//middlewares
const options = {
    origin : "http://localhost:5173",
    credentials : true
}
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors(options));
//routes
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/problems",problemRoutes);
//app.use("/contests",contestRouter);




connectToDB(process.env.MONGODB_URL!);
mongoose.connection.once('open',() =>{
    app.listen(PORT,()=>{
        console.log(`Server started on PORT NUMBER : ${PORT}`);
    })
})
app.use(errorHandler);
