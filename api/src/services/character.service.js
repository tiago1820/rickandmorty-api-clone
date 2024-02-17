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

            const characters = await Character.findAll({ where: { id: characterIds } });
            return characters;
        } catch (error) {
            throw error;
        }
    }

    getCharacters = async (filter) => {
        try {
            const characters = await Character.findAll({ where: filter });
            return characters;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = CharacterService;