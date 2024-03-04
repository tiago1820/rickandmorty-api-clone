import express from "express";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import morgan from "morgan";
import { router } from "./routes/index.js";

const server = express();

// Middlewares
server.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));
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

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", router);

// Swagger
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// server.use("/rickandmorty", router);

export { server };