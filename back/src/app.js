import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { connectDB } from "./helpers/index.js";
import {siteRouter, userRouter, deviceRouter} from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB();


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/api/site', siteRouter);
app.use('/api/auth', userRouter);
app.use('/api/device', deviceRouter);

app.listen(PORT, () => {
    console.log(`Server listen on port  ${PORT}`);
});
