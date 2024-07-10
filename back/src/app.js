import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './helpers/index.js';
import { siteRouter, userRouter, deviceRouter, statisticsRouter } from './routes/index.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const useSecureAuth = process.env.NODE_ENV !== 'development';

await connectDB();

app.use(cookieParser());
app.use(express.json());

const allowedOrigins =  useSecureAuth ?  process.env.ALLOWED_ORIGINS?.split(',') || [] : process.env.LOCAL_ALLOWED_ORIGINS?.split(',') || []
// Configure CORS
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

    app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
});

// Routes
app.use('/api/site', siteRouter);
app.use('/api/auth', userRouter);
app.use('/api/device', deviceRouter);
app.use('/api/statistics', statisticsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
