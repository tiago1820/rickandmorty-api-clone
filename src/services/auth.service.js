const { Auth } = require('../db');


class AuthService {

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
}

module.exports = AuthService;