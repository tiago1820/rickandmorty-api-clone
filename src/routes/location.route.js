const { Router } = require("express");
const locationRoute = Router();

const LocationController = require("../controllers/location.controller.js");
const locController = new LocationController();

locationRoute.post("/location", locController.postLocation);


module.exports = locationRoute;
