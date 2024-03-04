// require("dotenv").config();
// const { Sequelize } = require("sequelize");
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DOCKER_PORT } = process.env;
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DOCKER_PORT } = process.env;

import CharacterModel from './models/character.model.js';
import LocationModel from './models/location.model.js';
import EpisodeModel from './models/episode.model.js';
import AuthModel from './models/auth.model.js';


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_DOCKER_PORT}/rickandmorty`,
    { logging: false, native: false }
);

CharacterModel(sequelize);
LocationModel(sequelize);
EpisodeModel(sequelize);
AuthModel(sequelize);

const { Character } = sequelize.models;
const { Location } = sequelize.models;
const { Episode } = sequelize.models;
const { Auth } = sequelize.models;

export { Character, Location, Episode, Auth, sequelize as conn };
