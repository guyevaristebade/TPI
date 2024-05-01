import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { connectDB } from "./helpers/index.js";
import { siteRouter, agentRouter, deviceRouter } from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/site', siteRouter);
app.use('/api/auth', agentRouter);
app.use('/api/device', deviceRouter);

app.listen(PORT, () => {
    console.log(`Server listen on port  ${PORT}`);
});
