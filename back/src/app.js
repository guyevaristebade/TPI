import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

import { connectDB } from "./helpers/index.js";
import { userRouter } from "./routes/index.js";

const app = express();
const PORT = 2024;

dotenv.configDotenv();
connectDB()

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',userRouter)

app.listen(PORT, () => {
    console.log(`Server listen on port  ${PORT}`);
});