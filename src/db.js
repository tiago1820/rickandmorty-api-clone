import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DOCKER_PORT } = process.env;

import CharacterModel from './models/character.model.js';
import LocationModel from './models/location.model.js';
import EpisodeModel from './models/episode.model.js';
import UserModel from './models/user.model.js';
import UserFavoriteModel from './models/userFavorite.model.js';
import CharLocationModel from './models/charLocation.model.js';
import CharOriginModel from './models/charOrigin.model.js';
import CharEpisodeModel from './models/charEpisode.model.js';

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_DOCKER_PORT}/rickandmorty`,
    { logging: false, native: false }
);

CharacterModel(sequelize);
LocationModel(sequelize);
EpisodeModel(sequelize);
UserModel(sequelize);
UserFavoriteModel(sequelize);
CharLocationModel(sequelize);
CharOriginModel(sequelize);
CharEpisodeModel(sequelize);

const { Character, Episode, Location, User, UserFavorite, CharLocation, CharOrigin, CharEpisode } = sequelize.models;

export { Character, Location, Episode, User, UserFavorite, CharLocation, CharOrigin, CharEpisode, sequelize as conn };
