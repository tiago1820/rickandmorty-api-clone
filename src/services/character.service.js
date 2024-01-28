const { Character } = require("../db.js");
const FormattedData = require("../helpers/formattedData.helper.js");

class CharacterService {
    constructor() {
        this.format = new FormattedData();
    }

    getAllCharacters = async (query) => {
        try {
            const characters = await Character.findAll({ where: query });

            return this.format.formattedCharacter(characters);
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

}

module.exports = CharacterService;