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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
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

        response.data = agent;

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

export const editUser = async (oldPassword, newPassword) =>{
    let response = {
        status : 200
    }

    let validation = passwordValidators(newPassword);
    for (const el of validation) {
        if (!el.validator) {
            response.status = 400
            response.error = el.message
            return response
        }
    }

    try{
        const user = await User.findById(userId).exec();
        const password = user.password

    }catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response;
}
