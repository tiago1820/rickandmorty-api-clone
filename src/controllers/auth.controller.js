import { AuthService } from '../services/auth.service.js';
import { Encryption } from '../helpers/encryption.helper.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const { SECRET } = process.env;

export class AuthController {
    constructor() {
        this.auth = new AuthService();
        this.encrypt = new Encryption();
    }

    signup = async (req, res) => {
        let { email, password } = req.body;
        try {
            password = await this.encrypt.encryptPassword(password);
            const newUser = await this.auth.signup(email, password);
            const token = jwt.sign({ id: newUser.id }, SECRET, {
                expiresIn: 60 * 60 * 24
            });

            return res.status(200).json({ auth: true, token });
        } catch (error) {
            if (error.message === 'El usuario ya existe') {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json("Error interno del servidor");
        }

    }

    signin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const userData = await this.auth.show(email);
            if (!userData) {
                return res.status(401).json({ auth: false, token: null });
            }

            const validPassword = await this.encrypt.validatePassword(password, userData.password);
            if (!validPassword) {
                return res.status(401).json({ auth: false, token: null });
            }

            const token = jwt.sign({ id: userData.id }, SECRET, {
                expiresIn: 60 * 60 * 24
            });

            return res.status(200).json({ auth: true, token });
        } catch (error) {
            console.error("Error en signin:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

    }
}