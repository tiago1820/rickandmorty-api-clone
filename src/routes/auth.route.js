import { Router } from 'express';
export const authRoute = Router();

import { AuthController } from '../controllers/auth.controller.js';

const auth = new AuthController();

authRoute.post('/api/auth/signup', auth.signup);

authRoute.post('/api/auth/signin', auth.signin);