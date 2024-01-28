const { Character } = require("../db.js");

class CharacterService {

    getAllCharacters = async () => {
        try {
            const characters = await Character.findAll();

            const formattedData = {
                info: {
                    count: characters.length,
                    pages: 1,
                    next: null,
                    prev: null
                },
                results: characters
            };

            return formattedData;
            
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

}

module.exports = CharacterService;