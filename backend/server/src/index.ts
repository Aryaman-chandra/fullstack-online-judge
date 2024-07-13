import express  from 'express';
import 'dotenv/config';
import connectToDB from './db';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
const PORT = 3000;
const app = express();
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import problemRoutes from './routes/problem';
import submissionRoutes from './routes/submission';
import contestRoutes from './routes/contest';
//middlewares
const options = {
    origin :process.env.CLIENT_URL,
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
app.use("/submissions",submissionRoutes);
app.use("/contests",contestRoutes);


connectToDB(process.env.MONGODB_URL!);
mongoose.connection.once('open',() =>{
    app.listen(PORT,'0.0.0.0',()=>{
        console.log(`Server started on PORT NUMBER : ${PORT}`);
    })
})
app.use(errorHandler);
