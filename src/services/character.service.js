const { Character, Location, Episode } = require("../db.js");

class CharacterService {

    postCharacter = async (data) => {
        if (data.id) {
            try {
                const [updatedRowsCount, [updatedCharacter]] = await Character.update(data, {
                    where: {
                        id: data.id
                    },
                    returning: true
                });

                const { dataValues } = updatedCharacter

                return dataValues;
            } catch (error) {
                throw error;
            }
        } else {

            try {

                const info = {
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    gender: data.gender,
                    origin: {
                        id: data.origin,
                    },
                    location: {
                        id: data.location, 
                    },
                    episode: data.episode,
                    created: new Date().toISOString()
                };
                
                let createdCharacter = await Character.create(info);
                
                // const { id: charId, episode } = createdCharacter.dataValues;

                console.log("CREADO: ", createdCharacter);

                const episodeUrl = "http://localhost:3001/api/episode/";

                if (!episode) { episode = [] };
                episode.push(episodeUrl);

                const characterUrl = "http://localhost:3001/api/character/" + charId;



                // if(!episode) {episode = []}
                // episode.push(episodeUrl)


                await Character.update({ url: characterUrl }, { where: { id: charId } });

                createdCharacter = await Character.findByPk(charId);
                let { dataValues } = createdCharacter;

                // LOCATION
                // const [location] = await Location.findAll({ where: { id: dataValues.location.id } });
                let { residents } = location.dataValues;
                if (!residents) { residents = [] };
                residents.push(characterUrl);
                await Location.update({ residents: residents }, { where: { id: location.id } });

                // EPISODE
                const [oneEpisode] = await Episode.findAll({ where: { id: dataValues.episode.id } })
                let { characters } = oneEpisode.dataValues;
                if (!characters) { characters = [] }
                characters.push(characterUrl);

                await Episode.update({ characters: characters }, {
                    where: { id: oneEpisode.id }
                })

                createdCharacter = await Character.findByPk(charId);

                return createdCharacter.dataValues;
            } catch (error) {
                throw error;
            }
        }
    }

    getOneMultipleCharacters = async (query) => {
        try {
            const characterIds = query.split(",").map(id => parseInt(id.trim()));
            const result = await Character.findAll({ where: { id: characterIds } });
            const characters = result.map(item => item.dataValues);
            const characterOrigins = [];
            const characterLocations = [];

            for (const character of characters) {
                let origin = null;
                let location = null;

                if (character.origin && character.origin.id) {
                    origin = await this.getLocationOrOriginDetails(character.origin.id);
                }

                if (character.location && character.location.id) {
                    location = await this.getLocationOrOriginDetails(character.location.id);
                }

                characterOrigins.push(origin);
                characterLocations.push(location);
            }

            for (let i = 0; i < characters.length; i++) {
                characters[i].origin = characterOrigins[i] ? { name: characterOrigins[i].name, url: characterOrigins[i].url } : null;
                characters[i].location = characterLocations[i] ? { name: characterLocations[i].name, url: characterLocations[i].url } : null;
            }

            return characters;
        } catch (error) {
            throw error;
        }
    }

    getCharacters = async (filter) => {
        try {
            const result = await Character.findAll({ where: filter });
            const characters = result.map(item => item.dataValues);
            const characterOrigins = [];
            const characterLocations = [];

            for (const character of characters) {
                let origin = null;
                let location = null;
                let episode = null

                if (character.origin && character.origin.id) {
                    origin = await this.getLocationOrOriginDetails(character.origin.id);
                }

                if (character.location && character.location.id) {
                    location = await this.getLocationOrOriginDetails(character.location.id);
                }

                if (character.episode && character.episode.id) {

                }

                characterOrigins.push(origin);
                characterLocations.push(location);
            }

            for (let i = 0; i < characters.length; i++) {
                characters[i].origin = characterOrigins[i] ? { name: characterOrigins[i].name, url: characterOrigins[i].url } : null;
                characters[i].location = characterLocations[i] ? { name: characterLocations[i].name, url: characterLocations[i].url } : null;
            }

            return characters;
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

    getLocationOrOriginDetails = async (id) => {
        if (id) {
            return await Location.findByPk(id, { attributes: ['name', 'url'] });
        } else {
            return null;
        }
    }

    countAllCharacters = async () => {
        try {
            const count = await Character.count();
            return count;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CharacterService;