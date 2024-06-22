import { User } from "../models/index.js";
import { passwordValidators } from "../helpers/index.js";
import bcrypt from "bcryptjs";
import { sanitizeFilter } from 'mongoose';

export const register = async (userData) => {
    let response = {
        status : 200
    }

    try {
        let agent = await User.findOne(sanitizeFilter({ name: userData.name }));
        if (agent) {
            response.status = 400
            response.error = 'Name already exists'
            return response
        }

        let validation = passwordValidators(userData.password);
        for (const el of validation) {
            if (!el.validator) {
                response.status = 400
                response.error = el.message
                return response
            }
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newAgent = new User(sanitizeFilter({
            name: userData.name,
            password: hashedPassword,
            permissions: userData.permissions,
        }));

        await newAgent.save();

        response.data = { message: "Register successfully" };
    } catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }
    return  response;
};



export const deleteUser = async (_id) => {
    let response = {
        status : 200
    }

    try {
        const agent = await User.findOneAndDelete(sanitizeFilter({ _id }));
        if (!agent) {
            response.status = 400
            response.error = 'User Not found'
            return response
        }

        response.data = { message: "User deleted successfully" };

    } catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }
    return response
};

export const getAllAgents = async () => {
    let response = {
        status : 200
    }

    try {
        let agents = await User.find({});
        
        if(agents && agents.length <= 0){
            response.status = 400
            response.error = 'Users Not found'
            return response
        }

        agents = agents.map(agent => {
            const { password, ...agentWithoutPassword } = agent.toObject();
            return agentWithoutPassword;
        });

        response.data = agents
    } catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
};

export const isLoggedIn = (req, res, next) => {
    let response = {
        status: 200
    };

    if (req.cookies['token-auth']) {
        res.cookie('token-auth', req.cookies['token-auth'], {
            maxAge: 31 * 24 * 3600 * 1000,
            httpOnly: true,
            sameSite : "None",
            secure: process.env.NODE_ENV !== 'development'
        });
    }

    response.data = { agent: req.user, token: req.cookies['token-auth'] };

    return res.status(response.status).send(response.data || response.error);
};


