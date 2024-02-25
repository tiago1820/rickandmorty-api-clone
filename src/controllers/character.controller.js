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
                return res.status(404).json({ error: "Error al crear o editar el personaje" });
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

            if (data.length === 1) {
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
        let { page, ...filter } = req.query;

        if(page && parseInt(page) <= 0) {
            page = 1;
        }

        const allowedFilters = ['name', 'status', 'species', 'type', 'gender'];
        const invalidFilters = Object.keys(filter).filter(key => !allowedFilters.includes(key));
        if (invalidFilters.length > 0) {
            return res.status(400).send(`Filtros no permitidos: ${invalidFilters.join(', ')}`)
        }

        try {

            const totalCharacters = await this.charService.countAllCharacters();
            let data = await this.charService.getCharacters(filter);

            if (!data) {
                return res.status(404).send("No hay registros de characters.");
            }

            if(page) {
                page = parseInt(page);
                if(!isNaN(page) && page > 0) {
                    const pageSize = 20;
                    const startIndex = (page -1) * pageSize;
                    data = data.slice(startIndex, startIndex + pageSize)
                }
            }

            data = await this.aws.getImageURL(data);
            data = await this.format.formattedCharacter(data, page, totalCharacters);

            return res.status(200).json(data);
        } catch (error) {
            console.log("TIAGO: ", error);
            return res.status(500).send("Error interno del servidor.");
        }
    }
}

module.exports = CharacterController;