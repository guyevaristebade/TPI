import express from 'express'
import { createUser, logout , login, iSloggedIn } from "../controllers/index.js";
import { authenticated } from "../helpers/index.js";
export const userRouter = express.Router()

userRouter.post('/login' ,login)

userRouter.post('/register', createUser)

userRouter.delete('/logout',logout)

userRouter.get('/',authenticated,iSloggedIn)