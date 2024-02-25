const { Router } = require("express");
const locationRoute = Router();

const LocationController = require("../controllers/location.controller.js");
const locController = new LocationController();

locationRoute.post("/api/location", locController.postLocation);
locationRoute.get("/api/location", locController.getLocations);
locationRoute.get("/api/location/:ids", locController.getOneOrMultipleLocations);

module.exports = locationRoute;