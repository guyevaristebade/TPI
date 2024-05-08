import { agentModel } from "../models/index.js";
import { passwordValidators } from "../helpers/index.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { sanitizeFilter } from 'mongoose'


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
        let  agents = await agentModel.find({});

        agents = agents.map(agent => {
            const { password, ...agentWithoutPassword } = agent.toObject();
            return agentWithoutPassword;
        });

        return { status: 200, data: agents };

    } catch (e) {

        return { status: 500, message: "Internal Server error" };
    }
};


export const iSloggedIn = (req, res, next) => {
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
};
