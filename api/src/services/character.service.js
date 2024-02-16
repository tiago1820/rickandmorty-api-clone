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

                const { dataValues } = updatedCharacter

                return dataValues;
            } catch (error) {
                throw error;
            }
        } else {
            data.created = new Date().toISOString();
            try {
                let createdCharacter = await Character.create(data);
                const { id } = createdCharacter;
                const characterUrl = "http://localhost:3001/character/" + id;

                await Character.update({ url: characterUrl }, {
                    where: { id: id }
                });

                createdCharacter = await Character.findByPk(id);
                const { dataValues } = createdCharacter;
                
                return dataValues;
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