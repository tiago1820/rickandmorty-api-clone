const CharacterService = require("../services/character.service.js");

class CharacterController {
    constructor() {
        this.charService = new CharacterService();
    }

    getAllCharacters = async (req, res) => {
        try {
            const data = await this.charService.getAllCharacters();

            if(!data) {
                return res.status(404).send("No hay registros de characters.");
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send("Error interno del servidor.");
        }
    }
}

module.exports = CharacterController;