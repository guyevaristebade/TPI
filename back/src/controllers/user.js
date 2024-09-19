import {User} from "../models/index.js";
import {passwordValidators} from "../helpers/index.js";
import bcrypt from "bcryptjs";
import mongoose, { sanitizeFilter } from 'mongoose';

export const register = async (userData) => {
    let response = {
        status : 201,
        success : true
    }

    try {
        let user = await User.findOne(sanitizeFilter({ name: userData.name }));
        if (user) {
            response.status = 400
            response.success = false
            response.msg = 'Ce nom est déjà utilisée, Veuillez choisir un autre'
            return response;
        }

        let validation = passwordValidators(userData.password);
        for (const el of validation) {
            if (!el.validator) {
                response.status = 400
                response.success = false
                response.msg = el.message
                return response
            }
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newAgent = new User(sanitizeFilter({
            name: userData.name,
            password: hashedPassword,
            role: userData.role,
        }));

        await newAgent.save();

        response.msg = "Inscription réussie avec succès";
    } catch (e) {
        response.status = 500
        response.success = false;
        response.msg = 'Internal server error'
    }
    return  response;
};



/**
 * This function provide to delete a user by ID
 * @param {String} id user ID to delete
 * */
export const deleteUser = async (id) => {
    let response = {
        status : 201,
        success : true
    }

    try {
        const agent = await User.findByIdAndDelete(id);
        if (!agent) {
            response.status = 400
            response.success = false;
            response.msg = 'Utilisateur introuvable'
            return response
        }

        response.data = agent;

    } catch (e) {
        response.status = 500
        response.success = false
        response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
    }
    return response;
};

export const getAllAgents = async (req) => {
    let response = {
        status : 201,
        success : true
    }

    try {
        let agents = await User.find().sort({ name : 1 });

        const agentOwnPassword = agents.map(agent => {
            const { password, ...agentWithoutPassword } = agent.toObject();
            return agentWithoutPassword;
        });

        response.data = agentOwnPassword.filter(agent => agent._id.toString() !== req.user._id.toString())
    } catch (e) {
        response.status = 500
        response.success = false
        response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
    }

    return response;
};

export const updateAgent = async (id , userData) =>{
    let response = {
        status : 201,
        success : true
    }

    if(!mongoose.isValidObjectId(id)){
        response.status = 400
        response.success = false
        response.msg = 'Identifiant invalide '
        return response;
    }

    try{
        const agent = await User.findByIdAndUpdate(id, userData);

        if(!agent){
            response.status = 400
            response.success = false
            response.msg = 'Une erreur s\'est produite lors de la mise à jour'
            return response;
        }

        response.data = agent

    } catch (e) {
        response.status = 500
        response.success = false
        response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
    }

    return response
}

export const getUserById = async (id) =>{
    let response = {
        status : 201,
        success : true
    }

    if(!mongoose.isValidObjectId(id)){
        response.status = 400
        response.success = false
        response.msg = 'Identifiant invalide '
        return response;
    }

    try{
        let  agent = await User.findById(id);

        if(!agent){
            response.status = 400;
            response.success = false
            response.msg  = "Utilisateur introuvable";
            return response;
        }

        response.data = agent;

    } catch (e) {
        response.status = 500;
        response.success = false
        response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
    }

    return response;
}
