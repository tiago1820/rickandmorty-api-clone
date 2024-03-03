const { Router } = require("express");
const locationRoute = Router();

const LocationController = require("../controllers/location.controller.js");
const locController = new LocationController();

const Encryption = require('../helpers/encryption.helper.js');
const encrypt = new Encryption();

locationRoute.post("/api/location", encrypt.verifyToken, locController.postLocation);

locationRoute.get("/api/location", encrypt.verifyToken, locController.getLocations);
/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: Get locations filtered by name, type, or dimension.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter locations by the given name.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter locations by the given type.
 *       - in: query
 *         name: dimension
 *         schema:
 *           type: string
 *         description: Filter locations by the given dimension.
 *     responses:
 *       200:
 *         description: List of locations matching the specified criteria.
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
 *                       description: Total count of locations.
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the location.
 *                       name:
 *                         type: string
 *                         description: The name of the location.
 *                       type:
 *                         type: string
 *                         description: The type of the location.
 *                       dimension:
 *                         type: string
 *                         description: The dimension of the location.
 *                       residents:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: URLs to residents of the location.
 *                       url:
 *                         type: string
 *                         description: The URL of the location.
 *                       created:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the location.
 *       400:
 *         description: Bad request. Invalid parameters provided.
 *       500:
 *         description: Internal server error.
 */

locationRoute.get("/api/location/:ids", locController.getOneOrMultipleLocations);
/**
 * @swagger
 * /api/location/{ids}:
 *   get:
 *     summary: Get multiple locations by IDs.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: ids
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of location IDs to retrieve.
 *     responses:
 *       200:
 *         description: List of locations based on the provided IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the location.
 *                   name:
 *                     type: string
 *                     description: The name of the location.
 *                   type:
 *                     type: string
 *                     description: The type of the location.
 *                   dimension:
 *                     type: string
 *                     description: The dimension of the location.
 *                   residents:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: URLs to residents of the location.
 *                   url:
 *                     type: string
 *                     description: The URL of the location.
 *                   created:
 *                     type: string
 *                     format: date-time
 *                     description: The creation date of the location.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal server error.
 */

module.exports = locationRoute;