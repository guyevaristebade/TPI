import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { connectDB } from './helpers/index.js';
import { siteRouter, userRouter, deviceRouter, statisticsRouter } from './routes/index.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const useSecureAuth = process.env.NODE_ENV !== 'development';

await connectDB();

app.use(cookieParser());
//app.use(express.json());
app.use(bodyParser.json())

const allowedOrigins =  useSecureAuth ?  process.env.ALLOWED_ORIGINS?.split(',') || [] : process.env.LOCAL_ALLOWED_ORIGINS?.split(',') || []
// Configure CORS
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use('/api/site', siteRouter);
app.use('/api/auth', userRouter);
app.use('/api/device', deviceRouter);
app.use('/api/statistics', statisticsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
