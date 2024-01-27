const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("Bienvenido a la API de Rick and Morty");
});

module.exports = router;