const { Router } = require("express");
const router = Router();

const apiRoute = require("./api.route.js");
const characterRoute = require("./character.route.js");
const locationRoute = require("./location.route.js");

router.use(apiRoute);
router.use(characterRoute);
router.use(locationRoute);

module.exports = router;