const { Router } = require('express');
const authRoute = Router();

const AuthController = require('../controllers/auth.controller');

const auth = new AuthController();

authRoute.post('/api/auth/signup', auth.signup);

authRoute.post('/api/auth/signin', auth.signin);

module.exports = authRoute;