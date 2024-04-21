import { agentModel } from "../models/index.js";
import { confirmationValidators, passwordValidators } from "../helpers/index.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { sanitizeFilter } from 'mongoose'

// TODO Utiliser les fonctions de validations
export const register = async (req, res) => {
    try {
        let response = {
            status : 200
        }
        const { name, password, permissions } = req.body;

        let agent = await agentModel.findOne({ name });
        if (agent) {
            return res.status(400).json({ message: 'name already exists' });
        }

        let validation = passwordValidators(password);
        for (const el of validation) {
            if (!el.validator) {
                return res.status(400).json({ message: el.message });
            }
        }

        // Création de l'utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAgent = new agentModel({
            name: name,
            password: hashedPassword,
            permissions: permissions,
        });

        await newAgent.save();

        const token = jwt.sign({ agentId : newAgent._id, agentName : newAgent.name }, process.env.SECRET_KEY || '', { expiresIn: '1d' });

        // Configuration du cookie avec le token
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        response.data = { agent: req.user, token: req.cookies['token'] }
        es.status(response.status).send(response.data)
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server error' + err.message);
    }
}



export const login = async (req, res) => {
    try {
        let response = {
            status: 200
        };
        const { name, password } = req.body;

        if (!name || !password) return res.status(401).send("You need username and password");

        const agent = await agentModel.findOne(sanitizeFilter({ name: name }));

        if (!agent) return res.status(400).send("You must provide a valid account");

        const isMatch = await bcrypt.compare(password, agent.password);
        if (!isMatch) return res.status(400).send('Invalid password');

        const token = jwt.sign({ agentId: agent._id, name: agent.name }, process.env.SECRET_KEY || '', { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });

        response.data = { agent: { name : agent.name }  , token }; // Modifier si vous souhaitez inclure plus d'informations utilisateur
        res.status(response.status).send(response.data || response.error);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



export const logout = (req, res) =>{
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).send('agent logged out successfully');
}


export const iSloggedIn = (req, res, next) => {
    let response = {
        status : 200,
    }
    if (req.cookies['token']) {
        res.cookie('token', req.cookies['token'], {
            maxAge: 31 * 24 * 3600 * 1000,
            domain: process.env.COOKIE_DOMAIN,
        })
    }

    response.data = { agent: { name : req.user.name}  , token: req.cookies['token'] }
    return res.status(response.status).send(response.data || response.error)
}
