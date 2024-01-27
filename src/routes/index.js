const { Router } = require("express");
const router = Router();

const characterRoute = require("./character.route.js");

router.use(characterRoute);

module.exports = router;