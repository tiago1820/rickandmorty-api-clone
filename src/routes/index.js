import { Router } from "express";
export const router = Router();

import { apiRoute } from './api.route.js';
import { characterRoute } from "./character.route.js";
import { locationRoute } from './location.route.js';
import { episodeRoute } from './episode.route.js';
// import { authRoute } from './auth.route.js';
import { userRoute } from './user.route.js';

router.use(apiRoute);
router.use(characterRoute);
router.use(locationRoute);
router.use(episodeRoute);
// router.use(authRoute);
router.use(userRoute);