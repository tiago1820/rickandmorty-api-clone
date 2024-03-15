import { User } from '../db.js';
import { Encryption, ResponseHandler } from '../helpers/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRET } = process.env;

export class AuthController {
    constructor() {
        this.encrypt = new Encryption();
    }

    login = async (req, res) => {
        const responseHandler = new ResponseHandler(res);
        try {
            const { email, password } = req.body;
            const user = await this.authenticateUser(email, password);
            if (!user) return responseHandler.sendErrorResponse(401, 'Wrong username and/or password!');
            const token = this.generateToken(user.id);
            if (!token) return responseHandler.sendErrorResponse(500, 'An error occured!');
            const responseData = this.buildResponseData(user.email, token);
            return responseHandler.sendSuccessResponse(200, responseData);
        } catch (error) {
            return responseHandler.sendErrorResponse(500, 'Internal')
        }
    }

    authenticateUser = async (email, password) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;
        const isValidPassword = await this.encrypt.validatePassword(password, user.password);
        return isValidPassword ? user : null;
    }

    generateToken = (userId) => {
        try {
            return jwt.sign({ id: userId }, SECRET, { expiresIn: 60 * 60 * 24 });
        } catch (error) {
            return null;
        }
    }

    buildResponseData = (email, token) => {
        return { email, token };
    }

    refresh = async (req, res) => {
        let data = { 'error': '' };

        try {
            const { email } = req.body;
            const user = (await User.findOne({ where: { email } })).get({ plain: true });
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

    // logout puede ser hecho en el front-end
    logout = async (req, res) => { };

}