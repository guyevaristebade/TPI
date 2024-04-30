import express from 'express'
import {login, register, deleteUser, getAllAgents} from "../controllers/index.js";
import { authenticated } from "../helpers/index.js";
export const agentRouter = express.Router()


agentRouter.post('/register', async (req, res) => {
  const userData = req.body;
  const result = await register(userData);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json({ message: result.message });
});

agentRouter.post('/login' ,async (req,res) =>{
  const userData = req.body;
  const result = await login(userData);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json({ message: result.message });
});


agentRouter.delete('/:_id', async (req, res) => {
  const _id = req.params;
  const result = await deleteUser(_id);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json({ message: result.message });
});


agentRouter.get('/',authenticated,(req, res) => {
  try {
    if (req.cookies['token']) {
      return { status: 200, data: { agent: req.user, token: req.cookies['token'] } };
    }
    return { status: 401, message: "Unauthorized" };

  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server error" };
  }
});

agentRouter.get('/users', async (req, res) => {
    const result = await getAllAgents();
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }
    res.status(200).json({ agents: result.data });
});



agentRouter.delete('/logout',authenticated, async (req,res) => {
  try {
    res.clearCookie('token');
    return { status: 200, message: "User logged out successfully" };

  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server error" };
  }
});
