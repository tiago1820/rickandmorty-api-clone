import { User } from '../db.js';
import { Validator } from '../helpers/validator.helper.js';

export class UserService {
    constructor() {
        this.validator = new Validator();
    }

    // signup = async (email, password) => {
    //     try {
    //         const existingUser = await User.findOne({ where: { email: email } });
    //         if (existingUser) {
    //             throw new Error('El usuario ya existe');
    //         }

    //         const newUser = await User.create({
    //             email: email,
    //             password: password
    //         });

    //         if (newUser) return newUser;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // show = async (params) => {
    //     try {
    //         let user;

    //         if (this.validator.isValidUUID(params)) {
    //             user = await User.findByPk(params);
    //         } else {
    //             user = await User.findOne({ where: { email: params } });
    //         }

    //         if (!user) {
    //             throw new Error('El usuario no se encontró');
    //         }

    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}