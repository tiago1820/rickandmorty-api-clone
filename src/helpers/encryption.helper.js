import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRET } = process.env;


export class Encryption {

    encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    validatePassword = (password, passwordDB) => {
        return bcrypt.compare(password, passwordDB);
    }

    verifyToken = (req, res, next) => {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No token provider'
            });
        }
        const decoded = jwt.verify(token, SECRET);

        req.userId = decoded.id;
        next();

    }
}