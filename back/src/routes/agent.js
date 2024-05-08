import express from 'express'
import {  register, deleteUser, getAllAgents } from "../controllers/index.js";
import { authenticated } from "../helpers/index.js";
import {agentModel} from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const agentRouter = express.Router();


agentRouter.post('/register', async (req, res) => {
  const userData = req.body;
  const result = await register(userData);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json({ message: result.message });
});

agentRouter.post('/login', async (req, res) => {
  let response = {
    status: 200
  }

  const useSecureAuth = process.env.NODE_ENV !== 'development';

  //Validation des données
  const validation = req.body.name !== undefined && req.body.password !== undefined
  if (!validation) {
    return res.status(400).send('Username and password are required')
  }


  try {
    const user = await agentModel.findOne({ name: req.body.name }).exec()

    // If the user doesn't exist
    if (user === null) {
      return res.status(401).send('Username or password incorrect')
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
      return res.status(401).send('Username or password incorrect')
    }

    // Token generation
    const {
      password,
      ...tokenContent
    } = user.toObject();

    const token = jwt.sign(tokenContent, process.env.SECRET_KEY || '')

    res.cookie('token-auth', token, {
      maxAge: 31 * 24 * 3600 * 1000,
      httpOnly: useSecureAuth,
      secure: useSecureAuth,
      domain: process.env.COOKIE_DOMAIN
    })

    response.data = { user: tokenContent , token }
  } catch (error) {
    return res.status(500).send('Internal server error ' + error.message)
  }

  return res.status(response.status).send(response.data || response.error)
})



agentRouter.get('/users', async (req, res) => {
    const result = await getAllAgents();
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }
    res.status(200).json({ agents: result.data });
});


agentRouter.get('/is-logged-in', authenticated, async (req, res) => {
  let response= {
    status: 200,
  }

  const useSecureAuth = process.env.NODE_ENV !== 'development'

  if (req.cookies['token-auth']) {
    res.cookie('token-auth', req.cookies['token-auth'], {
      maxAge: 31 * 24 * 3600 * 1000, // 1 mois
      httpOnly: useSecureAuth,
      secure: useSecureAuth,
      domain: process.env.COOKIE_DOMAIN
    })
  }

  response.data = { user: req.user, token: req.cookies['token-auth'] }

  return res.status(response.status).send(response.data || response.error)
})



agentRouter.delete('/logout', authenticated, (req, res) => {
  let response = {
    status: 200,
  }

  res.cookie('token-auth', '', {
    maxAge: -100,
    domain: process.env.COOKIE_DOMAIN
  })

  return res.status(response.status).send('Disconnected')
})


agentRouter.delete('/:_id', async (req, res) => {
  const { _id } = req.params;
  const result = await deleteUser(_id);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json({ message: result.message });
});


/*agentRouter.get('/',authenticated,(req, res) => {
  try {
    if (req.cookies['token']) {
      return { status: 200, data: { agent: req.user, token: req.cookies['token'] } };
    }
    return { status: 401, message: "Unauthorized" };

  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server error" };
  }
});*/
