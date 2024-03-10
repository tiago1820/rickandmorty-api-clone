import { Router } from 'express';
export const authRoute = Router();

import { AuthController } from '../controllers/auth.controller.js';

const auth = new AuthController();

authRoute.post('/api/auth/login', auth.login);
authRoute.post('/api/auth/refresh', auth.refresh);