import {User} from "../models/index.js";
import {passwordValidators} from "../helpers/index.js";
import bcrypt from "bcryptjs";
import mongoose, {sanitizeFilter} from 'mongoose';
import jwt from "jsonwebtoken";

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

        response.data = newAgent;
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

export const getAllAgents = async (req) => {
    let response = {
        status : 200
    }

    try {
        let agents = await User.find().sort({ name : 1 });
        
        if(agents && agents.length <= 0){
            response.status = 400
            response.error = 'Users Not found'
            return response
        }

        agents = agents.map(agent => {
            const { password, ...agentWithoutPassword } = agent.toObject();
            return agentWithoutPassword;
        });

        response.data = agents.filter(agent => agent._id.toString() !== req.user._id.toString())
    } catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
};

export const updateAgent = async (id , userData) =>{
    let response = {
        status : 200
    }

    if(!mongoose.isValidObjectId(id)){
        response.status = 400
        response.error = 'ID is not valid'
        return response;
    }

    try{
        const agent = await User.findByIdAndUpdate(id, userData);

        if(!agent){
            response.status = 400
            response.error = 'Echec Update'
            return response;
        }

        response.data = agent

    } catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}

export const getUserById = async (id) =>{
    let response = {
        status : 200
    }

    if(!mongoose.isValidObjectId(id)){
        response.status = 400
        response.error = 'ID is not valid'
        return response;
    }

    try{
        let  agent = await User.findById(id,);

        if(!agent){
            response.status = 400
            response.error  = "No user found"
            return response;
        }



        response.data = {
            _id : agent._id,
            name : agent.name,
            permissions  : agent.permissions
        }

    } catch (e) {
        response.status = 500
        response.error = 'Internal server error'
    }

    return response
}
