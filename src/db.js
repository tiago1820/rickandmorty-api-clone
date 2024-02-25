require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DOCKER_PORT } = process.env;

const CharacterModel = require("./models/character.model");
const LocationModel = require("./models/location.model");
const EpisodeModel = require("./models/episode.model");

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_DOCKER_PORT}/rickandmorty`,
    { logging: false, native: false }
);

CharacterModel(sequelize);
LocationModel(sequelize);
EpisodeModel(sequelize);

const { Character } = sequelize.models;
const { Location } = sequelize.models;
const { Episode } = sequelize.models;

module.exports = {
    Character,
    Location,
    Episode,
    conn: sequelize,
}