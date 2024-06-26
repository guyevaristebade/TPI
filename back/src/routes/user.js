import express from 'express';
import { register, deleteUser, getAllAgents } from "../controllers/index.js";
import { authenticated } from "../helpers/index.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const userData = req.body;
    const response = await register(userData);

    res.status(response.status).send(response);
});

userRouter.post('/login', async (req, res) => {
    let response = {
        status: 200
    };

    const useSecureAuth = process.env.NODE_ENV !== 'development';

    if (!req.body.name || !req.body.password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await User.findOne({ name: req.body.name }).exec();

        if (!user) {
            return res.status(401).send('Username or password incorrect');
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(401).send('Username or password incorrect');
        }

        const { password, ...tokenContent } = user.toObject();

        const token = jwt.sign(tokenContent, process.env.SECRET_KEY || '');

        console.log(useSecureAuth)

        res.cookie('token-auth', token, {
            maxAge: 31 * 24 * 3600 * 1000,
            httpOnly: useSecureAuth,
            secure: useSecureAuth,
            domain :useSecureAuth ?  process.env.COOKIE_DOMAIN : process.env.LOCAL_COOKIE_DOMAIN,
            //sameSite: useSecureAuth ? "None" : "Lax"
        });

        response.data = { user: tokenContent, token : token };
    } catch (error) {
        return res.status(500).send('Internal server error ' + error.message);
    }

    return res.status(response.status).send(response.data || response.error);
});

userRouter.get('/users', authenticated,async (req, res) => {
    const result = await getAllAgents();
    if (result.status !== 200) {
        return res.status(result.status).json({ message: result.message });
    }
    res.status(200).json({ agents: result.data });
});

userRouter.get('/is-logged-in', authenticated, async (req, res) => {
    let response = {
        status: 200,
    };

    const useSecureAuth = process.env.NODE_ENV !== 'development';

    console.log(useSecureAuth)
    if (req.cookies['token-auth']) {
        res.cookie('token-auth', req.cookies['token-auth'], {
            maxAge: 31 * 24 * 3600 * 1000,
            httpOnly: useSecureAuth,
            secure: useSecureAuth,
            domain :useSecureAuth ?  process.env.COOKIE_DOMAIN : process.env.LOCAL_COOKIE_DOMAIN,
            //sameSite: useSecureAuth ? "None" : "Lax"
        });
    }


    response.data = { user: req.user, token : req.cookies['token-auth'] };

    res.status(response.status).send(response.data || response.error);
});

userRouter.delete('/logout', authenticated, (req, res) => {
    res.cookie('token-auth', '', {
        maxAge: -100
    });

    res.status(200).send('Disconnected');
});

userRouter.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    const result = await deleteUser(_id);

    if (result.status !== 200) {
        return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
});
