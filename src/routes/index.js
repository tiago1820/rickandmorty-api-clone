const { Router } = require("express");
const router = Router();

const apiRoute = require("./api.route.js");
const characterRoute = require("./character.route.js");

router.use(apiRoute);
router.use(characterRoute);

module.exports = router;