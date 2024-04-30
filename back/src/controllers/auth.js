import { agentModel } from "../models/index.js";
import { passwordValidators } from "../helpers/index.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import mongoose, { sanitizeFilter } from 'mongoose'


export const register = async (userData) => {
    try {
        let agent = await agentModel.findOne(sanitizeFilter({ name: userData.name }));
        if (agent) {
            return { status: 400, message: 'Name already exists' };
        }

        let validation = passwordValidators(userData.password);
        for (const el of validation) {
            if (!el.validator) {
                return { status: 400, message: el.message };
            }
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newAgent = new agentModel(sanitizeFilter({
            name: userData.name,
            password: hashedPassword,
            permissions: userData.permissions,
        }));

        await newAgent.save();

        return { status: 200, message: "Register successfuly" };
    } catch (e) {
        console.error(e);
        return { status: 500, message: "Internal Server error" };
    }
};


export const login = async (userData) => {
    try {
        if (userData.username === "" || userData.password === "")
            return { status : 400  ,message : "you need username and password for logged in" };

        const agent = await agentModel.findOne(sanitizeFilter({ name : userData.name }));

        if (!agent) return {status: 404,  message : "You must provide a valid account"};

        const isMatch = await bcrypt.compare(userData.password, agent.password);

        if (!isMatch)
            return { status : 400,  message : 'Invalid password'};


        const token = jwt.sign( {agent : { agentId: agent._id, name : agent.name, permissions: agent.permissions }}, process.env.SECRET_KEY);

        return { status : 200, message : "Login successfuly", token }

    } catch (e) {
        console.error(e)
        return { status: 500, message: "Internal Server error" };
    }
};



export const deleteUser = async (_id) => {
    try {

        const agent = await agentModel.findOneAndDelete(sanitizeFilter(_id));
        if (!agent) {
            return { status: 404, message: "User not found" };
        }

        return { status: 200, message: "User deleted successfully" };

    } catch (e) {
        console.error(e);
        return { status: 500, message: "Internal Server error " + e.message };
    }
};


export const getAllAgents = async () => {
    try {
        const agents = await agentModel.find({});
        return { status: 200, data: agents };

    } catch (e) {
        console.error(e);
        return { status: 500, message: "Internal Server error" };
    }
};


/*export const iSloggedIn = (req, res, next) => {
    let response = {
        status : 200
    };

    if (req.cookies['token']) {
        res.cookie('token', req.cookies['token'], {
            maxAge: 31 * 24 * 3600 * 1000,
            httpOnly : true
        });
    }

    response.data = { agent : req.user , token: req.cookies['token'] };

    return res.status(response.status).send(response.data || response.error);
};*/



/*export const logout = (req, res) => {
    res.cookie('token', '', {
        maxAge: -100
    })

    return res.status(200).send('Utilisateur déconnecté !!!!')
};*/
