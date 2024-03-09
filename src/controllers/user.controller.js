import { User } from '../db.js';
import { Encryption } from '../helpers/encryption.helper.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRET } = process.env;

export class UserController {
    constructor() {
        this.encrypt = new Encryption();
    }

    store = async (req, res) => {
        let data = { 'error': '' };

        try {

            //hacer la validacion
            const validator = true;
            if (validator) {
                const { email, password } = req.body;
                const emailExists = await User.count({ where: { email } });

                if (emailExists === 0) {
                    const hash = await this.encrypt.encryptPassword(password);
                    const newUser = (await User.create({ email: email, password: hash })).get({ plain: true });
                    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: 60 * 60 * 24 });

                    if (!token) {
                        data['error'] = 'An error occurred!';
                        return res.status(500).json(data);
                    }

                    data = { ...data, email: newUser.email, token }
                } else {
                    data['error'] = 'Email already registered!';
                    return res.status(409).json(data);
                }
            } else {
                data['error'] = 'Incorrect data';
                return res.status(409).json(data);
            }

            return res.status(201).json(data);

        } catch (error) {
            data['error'] = 'Internal Server Error';
            return res.status(500).json(data);
        }

    }
}