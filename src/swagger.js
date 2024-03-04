import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rick And Morty API Clone",
            version: "1.0.0",
        },
    },
    apis: [path.join(__dirname, "./routes/*.js")], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
