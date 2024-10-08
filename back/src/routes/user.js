import express from 'express';
import {deleteUser, getAllAgents, getUserById, register} from "../controllers/index.js";
import {authenticated, passwordValidators} from "../helpers/index.js";
import {User} from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();
const useSecureAuth = process.env.NODE_ENV !== 'development';

userRouter.post('/register', async (req, res) => {
    const userData = req.body;
    const response = await register(userData);

    res.status(response.status).send(response);
});

userRouter.post('/login', async (req, res) => {
    let response = {
        status: 200,
        success: true,
    };

    const { password, name } = req.body;

    try {
        // Vérification des champs requis
        if (!name || !password) {
            response.status = 400;
            response.success = false;
            response.msg = 'Veuillez remplir tous les champs avant la validation';
            return res.status(response.status).send(response);
        }

        // Vérification si l'utilisateur existe
        const user = await User.findOne({ name }).exec();
        if (!user) {
            response.status = 401;
            response.success = false;
            response.msg = "Utilisateur introuvable";
            return res.status(response.status).send(response);
        }

        // Comparaison des mots de passe
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            response.status = 401;
            response.success = false;
            response.msg = "Mot de passe invalide";
            return res.status(response.status).send(response);
        }

        // Génération du token et suppression du mot de passe des données
        const { password: _, ...tokenContent } = user.toObject();
        const token = jwt.sign(tokenContent, process.env.SECRET_KEY || '');

        // Envoi du token dans un cookie sécurisé
        res.cookie('token', token, {
            maxAge: 31 * 24 * 3600 * 1000, // 1 mois
            httpOnly: true,
            secure: useSecureAuth,
            domain: process.env.COOKIE_DOMAIN,
            sameSite: 'None',
        });

        response.data = { user: tokenContent, token };
        return res.status(response.status).send(response);
    } catch (error) {
        response.status = 500;
        response.success = false;
        response.msg = `Erreur serveur : ${error.message}`;
        return res.status(response.status).send(response);
    }
});

/*userRouter.post('/login', async (req, res) => {
    let response = {
        status : 200,
        success : true
    }

    const {  password, name }  = req.body

    try {
        if (!req.body.name || !req.body.password) {
            response.status = 400
            response.success = false
            response.msg = 'Veuillez remplir tous les champs avant la validation'
            return res.status(response.status).send(response);
        }
        const user = await User.findOne({ name: req.body.name }).exec();

        if (!user) {
            response.status = 401
            response.success = false
            response.msg = "Utilisateur Introuvable"
            return res.status(response.status).send(response);
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            response.status = 401
            response.success = false
            response.msg = "Mot de passe  invalide"
            return res.status(response.status).send(response);
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

        return res.status(response.status).send(response);

    } catch (error) {
        response.status = 500
        response.success = false
        response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeurs ' + error.message
        return res.status(response.status).send(response);
    }
});*/

userRouter.get('/users', authenticated,async (req, res) => {
    const response = await getAllAgents(req);

    res.status(200).send(response);
});

userRouter.get('/is-logged-in', authenticated, async (req, res) => {
    let response = {
        status: 200,
    };

    const token = req.cookies['token'];

    if (token) {
        response.data = { user: req.user, token };
    }

    res.status(response.status).send(response);
});

userRouter.delete('/logout', authenticated, (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: useSecureAuth,
        domain: process.env.COOKIE_DOMAIN,
        sameSite: 'None'
    });

    res.status(200).send("Déconnexion");
});


userRouter.delete('/:id', authenticated, async (req, res) => {
    if(req.user.role === "Admin"){
        const { id } = req.params;
        const response = await deleteUser(id);
        res.status(response.status).send(response);
    }else{
        res.status(400).send({msg : " Vous n'avez pas le droit d'effectuer cette action"})
    }
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

    return  res.status(response.status).send(response.error || response.data);
});

userRouter.get('/user/:id',authenticated ,async  (req, res) => {
    const response = await getUserById(req.params.id)
    res.status(response.status).send(response);
})

