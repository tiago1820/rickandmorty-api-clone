const { Character } = require("../db.js");

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
                return updatedCharacter;
            } catch (error) {
                throw error;
            }
        } else {
            data.created = new Date().toISOString();
            try {
                const createdCharacter = await Character.create(data);
                return createdCharacter;
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