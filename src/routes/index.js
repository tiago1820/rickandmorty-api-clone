const { Router } = require("express");
const router = Router();

const apiRoute = require("./api.route.js");
const characterRoute = require("./character.route.js");
const locationRoute = require("./location.route.js");
const episodeRoute = require("./episode.route.js");
const authRoute = require('./auth.route.js')

router.use(apiRoute);
router.use(characterRoute);
router.use(locationRoute);
router.use(episodeRoute);
router.use(authRoute);

module.exports = router;