const { Character, Location } = require("../db.js");

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
            data.created = new Date().toISOString();
            try {
                let createdCharacter = await Character.create(data);
                const { id: charId } = createdCharacter;
                const characterUrl = "http://localhost:3001/character/" + charId;

                await Character.update({ url: characterUrl }, {
                    where: { id: charId }
                });

                createdCharacter = await Character.findByPk(charId);
                let { dataValues } = createdCharacter;

                const [prueba] = await Location.findAll({ where: { id: dataValues.location.id } })

                const { residents } = prueba.dataValues;
                residents.push(characterUrl);

                await Location.update({ residents: residents }, {
                    where: { id: prueba.id }
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
                    origin = await Location.findByPk(character.origin.id, { attributes: ['name', 'url'] });
                }

                if (character.location && character.location.id) {
                    location = await Location.findByPk(character.location.id, { attributes: ['name', 'url'] });
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

                if (character.origin && character.origin.id) {
                    origin = await Location.findByPk(character.origin.id, { attributes: ['name', 'url'] });
                }

                if (character.location && character.location.id) {
                    location = await Location.findByPk(character.location.id, { attributes: ['name', 'url'] });
                }

                characterOrigins.push(origin);
                characterLocations.push(location);
            }

            for (let i = 0; i < characters.length; i++) {
                characters[i].origin = characterOrigins[i] ? { name: characterOrigins[i].name, url: characterOrigins[i].url } : null;
                characters[i].location = characterLocations[i] ? { name: characterLocations[i].name, url: characterLocations[i].url } : null;
            }


            console.log("AQUI: ", characters);

            return characters;
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

}

module.exports = CharacterService;