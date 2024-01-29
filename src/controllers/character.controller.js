const CharacterService = require("../services/character.service.js");

class CharacterController {
    constructor() {
        this.charService = new CharacterService();
    }

    postCharacter = async (req, res) => {
        const data = req.body;

        try {
            const result = await this.charService.postCharacter(data);

            if(data) return res.status(201).json(result);
        } catch (error) {
            return res.status(500).send("Error interno del servidor.");
        }
    }

    getOneMultipleCharacters = async (req, res) => {

        try {
            const data = await this.charService.getOneMultipleCharacters(req.params.ids); 
    
            if (!data) {
                return res.status(404).send("No hay registros de characters.");
            }
    
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send("Error interno del servidor.");
        }
    }

    getCharacters = async (req, res) => {
        const filter = req.query;

        try {
            const data = await this.charService.getCharacters(filter);
    
            if (!data) {
                return res.status(404).send("No hay registros de characters.");
            }
    
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send("Error interno del servidor.");
        }
    }
}

module.exports = CharacterController;

