const { Router } = require("express");
const apiRoute = Router();

const APIController = require("../controllers/api.controller.js");
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
 *       500:
 *         description: Internal server error.
 */

module.exports = apiRoute;