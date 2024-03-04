import { Router } from "express";
export const apiRoute = Router();

import { APIController } from '../controllers/api.controller.js';

const apiController = new APIController();

apiRoute.get("/api", apiController.getApiInfo);
/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get information about the API.
 *     tags:
 *       - API
 *     responses:
 *       200:
 *         description: Information about the API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 characters:
 *                   type: string
 *                   description: URL to retrieve characters data.
 *                 locations:
 *                   type: string
 *                   description: URL to retrieve locations data.
 *                 episodes:
 *                   type: string
 *                   description: URL to retrieve episodes data.
 *       500:
 *         description: Internal server error.
 */