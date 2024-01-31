require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Importar models aqui
const CharacterModel = require("./models/character.model");
const LocationModel = require("./models/location.model");

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmortyapiclone`,
    { logging: false, native: false }
);

// Models
CharacterModel(sequelize);
LocationModel(sequelize);

// Definir constantes model
const { Character } = sequelize.models;
const { Location } = sequelize.models;

// Relacionamiento de tablas aqui:

module.exports = {
    Character,
    Location,
    conn: sequelize,
}