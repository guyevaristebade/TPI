import { userModel } from "../models/index.js";
import { secret, confirmationValidators, passwordValidators } from "../helpers/index.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { sanitizeFilter } from 'mongoose'

// TODO Utiliser les fonctions de validations
export const createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Vérification si le nom d'utilisateur existe déjà
        let existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // Vérification si l'email existe déjà
        existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        console.log(password)
        // Validation du mot de passe
        let validation = passwordValidators(password);
        for (const el of validation) {
            if (!el.validator) {
                return res.status(400).json({ msg: el.message });
            }
        }

        // Création de l'utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword, // Note: À moins que vous n'ayez une autre utilisation, cela peut être inutile
            permissions: 1,
            registerDate: new Date()
        });

        await user.save();

        // Génération du token JWT
        const token = jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '1d' });

        // Configuration du cookie avec le token
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).send({ msg: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server error');
    }
}



export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne(sanitizeFilter({ username }));
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');

        const token = jwt.sign({ userId: user._id, username : user.username }, secret, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).send('User logged in successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
}


export const logout = (req, res) =>{
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).send('User logged out successfully');
}


export const iSloggedIn = (req, res, next) => {
    let response = {
        status : 200,
    }
    if (req.cookies['token']) {
        res.cookie('token', req.cookies['token'], {
            maxAge: 31 * 24 * 3600 * 1000, // 1 mois
            domain: process.env.COOKIE_DOMAIN,
        })
    }

    response.data = { user: req.user, token: req.cookies['token'] }
    return res.status(response.status).send(response.data || response.error)
}
