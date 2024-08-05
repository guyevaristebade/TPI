import express from 'express';
import {deleteUser, getAllAgents, register} from "../controllers/index.js";
import {authenticated, passwordValidators} from "../helpers/index.js";
import {User} from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();
const useSecureAuth = process.env.NODE_ENV !== 'development';

userRouter.post('/register', async (req, res) => {
    const userData = req.body;
    const response = await register(userData);

    res.status(response.status).send(response.data || response.error);
});

userRouter.post('/login', async (req, res) => {
    let response = {
        status : 200
    }

    if (!req.body.name || !req.body.password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await User.findOne({ name: req.body.name }).exec();

        if (!user) {
            response.error = "Nom / Mot de passe incorrect"
            response.status = 401
            return response;
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            response.error = "Nom / Mot de passe incorrect"
            response.status = 401
            return response;
        }

        const { password, ...tokenContent } = user.toObject();

        const token = jwt.sign(tokenContent, process.env.SECRET_KEY || '');


        res.cookie('token', token, {
            maxAge: 31 * 24 * 3600 * 1000,
            httpOnly: true,
            secure: useSecureAuth,
            domain : process.env.COOKIE_DOMAIN,
            sameSite: "None"
        });

        response.data = { user: tokenContent, token };

    } catch (error) {
        response.error = "Internal server error"
        response.status = 500
    }

    return res.status(response.status).send(response.data || response.error);
});

userRouter.get('/users', authenticated,async (req, res) => {
    const result = await getAllAgents();

    res.status(200).send(result.data  || result.error);
});

userRouter.get('/is-logged-in', authenticated, async (req, res) => {
    let response = {
        status: 200,
    };

    const token = req.cookies['token'];

    if (token) {
        response.data = { user: req.user, token };
    }

    res.status(response.status).send(response.data || response.error);
});

userRouter.delete('/logout', authenticated, (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: useSecureAuth,
        domain: process.env.COOKIE_DOMAIN,
        sameSite: 'None'
    });

    res.status(200).send({ message: 'Disconnected' });
});


userRouter.delete('/:_id', authenticated, async (req, res) => {
    const { _id } = req.params;
    const result = await deleteUser(_id);

    res.status(200).json({ message: result.message });
});

userRouter.post('/change-password', authenticated, async (req, res) => {
    const response = {
        status: 200
    }

    const { currentPassword, newPassword } = req.body;

    // Validate the new password
    let validation = passwordValidators(newPassword);
    for (const el of validation) {
        if (!el.validator) {
            response.status = 400;
            response.error = el.message;
            return res.status(response.status).send(response.error);
        }
    }

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            response.status = 404;
            response.error = 'User not found';
            return res.status(response.status).send(response.error);
        }


        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            response.status = 401;
            response.error = 'Current password is incorrect';
            return res.status(response.status).send(response.error);
        }


        const salt = await bcrypt.genSalt(10);
        // Update the user's password
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        response.data = user;
    } catch (error) {
        response.error = "Internal server error: " + error.message;
        response.status = 500;
    }

    res.status(response.status).send(response.error || response.data);
});


