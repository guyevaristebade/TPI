import express from 'express'
import {logout, login, iSloggedIn, register} from "../controllers/index.js";
import { authenticated } from "../helpers/index.js";
export const agentRouter = express.Router()

agentRouter.post('/login' ,login)

agentRouter.post('/register' ,register)

agentRouter.delete('/logout',authenticated, logout)

agentRouter.get('/',authenticated,iSloggedIn)
