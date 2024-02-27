const { Character, Location, Episode } = require("../db.js");

class CharacterService {

    postCharacter = async (data) => {
        if (data.id) {
            try {
                const characterId = data.id;

                const episodeUrl = "http://localhost:3001/api/episode/" + data.episode;

                const updatedInfo = {
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
                    created: new Date().toISOString()
                };

                // UPDATE CHARACTER INFO
                await Character.update(updatedInfo, { where: { id: characterId } });

                // CHARACTER URL
                const characterUrl = "http://localhost:3001/api/character/" + characterId;
                await Character.update({ url: characterUrl }, { where: { id: characterId } });

                // LOCATION
                const [location] = await Location.findAll({ where: { id: data.location } });
                let { residents } = location.dataValues;
                if (!residents) { residents = []; }
                if (!residents.includes(characterUrl)) {
                    residents.push(characterUrl);
                    await Location.update({ residents: residents }, { where: { id: data.location } });
                }

                // EPISODE
                const [oneEpisode] = await Episode.findAll({ where: { id: data.episode } });
                let { characters } = oneEpisode.dataValues;
                if (!characters) { characters = []; }
                if (!characters.includes(characterUrl)) {
                    characters.push(characterUrl);
                    await Episode.update({ characters: characters }, { where: { id: data.episode } });
  
                    let character = await Character.findByPk(characterId);
                    let { episode } = character.dataValues;
                    if (!episode) { episode = []; }
                    if (!episode.includes(episodeUrl)) {
                        episode.push(episodeUrl);
                        await Character.update({ episode: episode }, { where: { id: characterId } });
                    }
                }
                const updatedCharacter = await Character.findByPk(characterId);
                return updatedCharacter;

            } catch (error) {
                throw error;
            }
        } else {

            try {

                const episodeUrl = "http://localhost:3001/api/episode/" + data.episode;

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
                    created: new Date().toISOString()
                };

                let { dataValues } = await Character.create(info);
                let { episode } = dataValues;
                if (!episode) { episode = [] };
                episode.push(episodeUrl);


                const { id: charId } = dataValues;
                const characterUrl = "http://localhost:3001/api/character/" + charId;


                await Character.update({ url: characterUrl, episode }, { where: { id: charId } });

                dataValues = await Character.findByPk(charId);

                // LOCATION
                const [location] = await Location.findAll({ where: { id: dataValues.location.id } });
                let { residents } = location.dataValues;
                if (!residents) { residents = [] };
                residents.push(characterUrl);
                await Location.update({ residents: residents }, { where: { id: location.id } });

                // EPISODE
                const [oneEpisode] = await Episode.findAll({ where: { id: data.episode } })
                let { characters } = oneEpisode.dataValues;
                if (!characters) { characters = [] }
                characters.push(characterUrl);

                await Episode.update({ characters: characters }, {
                    where: { id: oneEpisode.id }
                })

                dataValues = await Character.findByPk(charId);

                return dataValues;
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