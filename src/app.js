const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger.js");
const morgan = require("morgan");
const router = require("./routes/index");

const server = express();

// Middlewares
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use("/", router);

// Swagger
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use(express.json());
// server.use("/rickandmorty", router);

module.exports = server;