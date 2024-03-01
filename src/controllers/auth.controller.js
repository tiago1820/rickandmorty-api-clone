const AuthService = require('../services/auth.service.js');
const Encryption = require('../helpers/encryption.helper');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { SECRET } = process.env;

class AuthController {
    constructor() {
        this.auth = new AuthService();
        this.encrypt = new Encryption();
    }

    signup = async (req, res) => {
        let { email, password } = req.body;
        try {
            // encripta el password
            password = await this.encrypt.encryptPassword(password);
            // alta en la base de datos
            const newUser = await this.auth.signup(email, password);
            // se crea el token
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



        return res.status(200).json("signup");
    }

    signin = async (req, res) => {
        return res.status(200).json("signin");
    }
}

module.exports = AuthController;