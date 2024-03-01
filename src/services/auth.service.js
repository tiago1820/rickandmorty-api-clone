const { Auth } = require('../db');
const Validator = require('../helpers/validator.helper.js');


class AuthService {
    constructor() {
        this.validator = new Validator();
    }

    signup = async (email, password) => {
        try {
            const existingUser = await Auth.findOne({ where: { email: email } });
            if (existingUser) {
                throw new Error('El usuario ya existe');
            }

            const newUser = await Auth.create({
                email: email,
                password: password
            });

            if (newUser) return newUser;
        } catch (error) {
            throw error;
        }
    }

    show = async (params) => {
        try {
            let user;

            if (this.validator.isValidUUID(params)) {
                user = await Auth.findByPk(params);
            } else {
                user = await Auth.findOne({ where: { email: params } });
            }

            if (!user) {
                throw new Error('El usuario no se encontró');
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;