const { Router } = require("express");
const characterRoute = Router();

const CharacterController = require("../controllers/character.controller.js");
const charController = new CharacterController();

characterRoute.get("/character", charController.getAllCharacters);
/**
 * @swagger
 * /character:
 *   get:
 *     summary: Get all the characters..
 *     tags:
 *       - Character
 *     responses:
 *       200:
 *         description: Used to get all the characters.
 *       404:
 *         description: No hay registro de personas.
 *       500:
 *         description: Error interno del servidor.
 */


module.exports = characterRoute;
