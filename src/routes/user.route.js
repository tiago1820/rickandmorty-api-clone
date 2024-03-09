import { Router } from 'express';
export const userRoute = Router();

import { UserController } from '../controllers/user.controller.js';
const user = new UserController();

userRoute.post('/api/user', user.store);