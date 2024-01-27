const { Router } = require("express");
const characterRoute = Router(); // Debes usar Router como función aquí

characterRoute.get("/character", (req, res) => {
    res.send("Hola Tiago Souza de Oliveira");
});

module.exports = characterRoute;
