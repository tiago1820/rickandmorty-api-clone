import { Router } from "express";
export const episodeRoute = Router();

import { EpisodeController } from '../controllers/episode.controller.js';
import { Encryption } from '../helpers/encryption.helper.js';

const epiController = new EpisodeController();
const encrypt = new Encryption();

episodeRoute.get("/api/episode", encrypt.verifyToken, epiController.index);
/**
 * @swagger
 * /api/episode:
 *   get:
 *     summary: Get all episodes or filter episodes by name and episode code.
 *     tags:
 *       - Episode
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter episodes by name.
 *       - in: query
 *         name: episode
 *         schema:
 *           type: string
 *         description: Filter episodes by episode code.
 *     responses:
 *       200:
 *         description: List of episodes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       description: The total number of episodes.
 *                     pages:
 *                       type: integer
 *                       description: The total number of pages.
 *                     next:
 *                       type: string
 *                       description: URL to the next page of episodes.
 *                     prev:
 *                       type: string
 *                       description: URL to the previous page of episodes.
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the episode.
 *                       name:
 *                         type: string
 *                         description: The name of the episode.
 *                       air_date:
 *                         type: string
 *                         description: The air date of the episode.
 *                       episode:
 *                         type: string
 *                         description: The episode code.
 *                       characters:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: URLs to characters appearing in the episode.
 *                       url:
 *                         type: string
 *                         description: URL to access the episode details.
 *                       created:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the episode.
 *       500:
 *         description: Internal server error.
 */

episodeRoute.get("/api/episode/:ids", encrypt.verifyToken, epiController.show);
/**
 * @swagger
 * /api/episode/{ids}:
 *   get:
 *     summary: Get one or multiple episodes by ID.
 *     tags:
 *       - Episode
 *     parameters:
 *       - in: path
 *         name: ids
 *         required: true
 *         description: Comma-separated list of episode IDs.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of episodes or a single episode.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the episode.
 *                       name:
 *                         type: string
 *                         description: The name of the episode.
 *                       air_date:
 *                         type: string
 *                         description: The air date of the episode.
 *                       episode:
 *                         type: string
 *                         description: The episode code.
 *                       characters:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: URLs to characters appearing in the episode.
 *                       url:
 *                         type: string
 *                         description: URL to access the episode details.
 *                       created:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the episode.
 *                 - type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the episode.
 *                     name:
 *                       type: string
 *                       description: The name of the episode.
 *                     air_date:
 *                       type: string
 *                       description: The air date of the episode.
 *                     episode:
 *                       type: string
 *                       description: The episode code.
 *                     characters:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: URLs to characters appearing in the episode.
 *                     url:
 *                       type: string
 *                       description: URL to access the episode details.
 *                     created:
 *                       type: string
 *                       format: date-time
 *                       description: The creation date of the episode.
 *       404:
 *         description: Episodes not found.
 *       500:
 *         description: Internal server error.
 */

episodeRoute.post("/api/episode", encrypt.verifyToken, epiController.store);

episodeRoute.put("/api/episode", encrypt.verifyToken, epiController.update);
