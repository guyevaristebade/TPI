import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { connectDB } from "./helpers/index.js";
import {siteRouter, userRouter, deviceRouter,statisticsRouter} from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB();


app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/site', siteRouter);
app.use('/api/auth', userRouter);
app.use('/api/device', deviceRouter);
app.use('/api/statistics',statisticsRouter);

app.listen(PORT, () => {
    console.log(`Server listen on port  ${PORT}`);
});
