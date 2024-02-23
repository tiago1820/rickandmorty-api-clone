const CharacterService = require("../services/character.service.js");
const S3Service = require("../services/s3.service.js");
const FormattedData = require("../helpers/formattedData.helper.js");

class CharacterController {
    constructor() {
        this.format = new FormattedData();
        this.charService = new CharacterService();
        this.aws = new S3Service();
    }

    postCharacter = async (req, res) => {
        const data = req.body;


        try {
            if (req.files) {
                data.image = req.files.image.name;
                await this.aws.uploadFile(req.files.image)
            }

            const result = await this.charService.postCharacter(data);

            if (!result) {
                return res.status(404).json({error: "Error al crear o editar el personaje"});
            }

            return res.status(201).json(result);

        } catch (error) {
            console.log("POST: ", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }

    getOneMultipleCharacters = async (req, res) => {
        try {
            let data = await this.charService.getOneMultipleCharacters(req.params.ids);

            if (!data) {
                return res.status(404).send("No hay registros de characters.");
            }

            data = await this.aws.getImageURL(data);

            if(data.length === 1) {
                data = data[0];
            } else {
                data = await this.format.formattedCharacter(data);
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send("Error interno del servidor.");
        }
    }

    getCharacters = async (req, res) => {
        const filter = req.query;

        try {
            let data = await this.charService.getCharacters(filter);

            if (!data) {
                return res.status(404).send("No hay registros de characters.");
            }
            
            data = await this.aws.getImageURL(data);
            data = await this.format.formattedCharacter(data);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).send("Error interno del servidor.");
        }
    }
}

module.exports = CharacterController;