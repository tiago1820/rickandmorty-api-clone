const { Router } = require("express");
const characterRoute = Router();

const CharacterController = require("../controllers/character.controller.js");
const charController = new CharacterController();

characterRoute.post("/api/character", charController.postCharacter);

characterRoute.get("/api/character/:ids", charController.getOneMultipleCharacters);
/**
 * @swagger
 * /api/character/{ids}:
 *   get:
 *     summary: Get characters by one or multiples IDs.
 *     tags:
 *       - Character
 *     parameters:
 *       - in: path
 *         name: ids
 *         schema:
 *           type: string
 *         description: IDs of characters to retrieve (comma-separated).
 *         required: true
 *     responses:
 *       200:
 *         description: List of characters matching the provided IDs.
 *       404:
 *         description: No characters found for the provided IDs.
 *       500:
 *         description: Internal server error.
 */

characterRoute.get("/api/character", charController.getCharacters);
/**
 * @swagger
 * /api/character:
 *   get:
 *     summary: Get characters based on specified criteria or retrieve all characters.
 *     tags:
 *       - Character
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter characters by name.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter characters by status (e.g., alive, dead).
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Filter characters by species.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter characters by type.
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: Filter characters by gender.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Specify the page number for pagination.
 *     responses:
 *       200:
 *         description: List of characters matching the specified criteria, or all characters if no criteria are provided.
 *       400:
 *         description: Bad request. Invalid parameters provided.
 *       500:
 *         description: Internal server error.
 */

module.exports = characterRoute;
