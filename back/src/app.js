import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './helpers/index.js';
import { siteRouter, userRouter, deviceRouter, statisticsRouter } from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

await connectDB();

app.use(cookieParser());
app.use(express.json());

// Fetch allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
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
