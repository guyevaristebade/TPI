import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { connectDB } from './helpers/index.js';
import {siteRouter, userRouter, deviceRouter, statisticsRouter, searchRouter, fileRouter} from './routes/index.js'
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const useSecureAuth = process.env.NODE_ENV !== 'development';

await connectDB();


const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []

// Configure CORS
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json())



// Routes
app.use('/api/site', siteRouter);
app.use('/api/auth', userRouter);
app.use('/api/device', deviceRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/search', searchRouter);
app.use('/api/file', fileRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
