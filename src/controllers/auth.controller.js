import { User } from '../db.js';
import { Encryption } from '../helpers/encryption.helper.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const { SECRET } = process.env;

export class AuthController {
    constructor() {
        this.encrypt = new Encryption();
    }

    login = async (req, res) => {
        let data = { 'error': '' };

        try {
            const { email, password } = req.body;
            const user = (await User.findOne({ where: { email } })).get({ plain: true });
            const validPassword = await this.encrypt.validatePassword(password, user.password);

            if (!user || !validPassword) {
                data['error'] = 'Wrong username and/or password!';
                return res.status(401).json(data);
            }

            const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: 60 * 60 * 24 });

            if (!token) {
                data['error'] = 'An error occured!';
                return res.status(500).json(data);
            }

            data = { ...data, email: user.email, token }
            return res.status(200).json(data);

        } catch (error) {
            data['error'] = 'Internal Server Error';
            return res.status(500).json(data);
        }

    }

    // signin = async (req, res) => {
    //     const { email, password } = req.body;
    //     try {
    //         const userData = await this.auth.show(email);
    //         if (!userData) {
    //             return res.status(401).json({ auth: false, token: null });
    //         }

    //         const validPassword = await this.encrypt.validatePassword(password, userData.password);
    //         if (!validPassword) {
    //             return res.status(401).json({ auth: false, token: null });
    //         }

    //         const token = jwt.sign({ id: userData.id }, SECRET, {
    //             expiresIn: 60 * 60 * 24
    //         });

    //         return res.status(200).json({ auth: true, token });
    //     } catch (error) {
    //         console.error("Error en signin:", error);
    //         return res.status(500).json({ error: "Error interno del servidor" });
    //     }

    // }
}