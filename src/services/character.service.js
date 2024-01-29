const { Character } = require("../db.js");
const FormattedData = require("../helpers/formattedData.helper.js");

class CharacterService {
    constructor() {
        this.format = new FormattedData();
    }

    getOneMultipleCharacters = async (query) => {
        try {
            const characterIds = query.split(",").map(id => parseInt(id.trim()));

            const characters = await Character.findAll({ where: { id: characterIds } });
            return this.format.formattedCharacter(characters);
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

    getCharacters = async (filter) => {
        try {
    
            const characters = await Character.findAll({ where: filter });
            return this.format.formattedCharacter(characters);
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

}

module.exports = CharacterService;