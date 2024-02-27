const EpisodeService = require("../services/episode.service.js");
const FormattedData = require("../helpers/formattedData.helper.js");

class EpisodeController {
    constructor() {
        this.epiService = new EpisodeService();
        this.format = new FormattedData();
    }

    postEpisode = async (req, res) => {
        const data = req.body;

        try {
            const result = await this.epiService.postEpisode(data);
            if (result) {
                return res.status(201).json(result);
            }
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    getOneOrMultipleEpisodes = async (req, res) => {
        try {
            let data = await this.epiService.getOneOrMultipleEpisodes(req.params.ids);

            if (!data) {
                return res.status(404).json({ error: "No hay registros de characters." })
            }

            data = await this.format.formattedLocation(data);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    getEpisodes = async (req, res) => {
        const filter = req.query;

        try {
            let data = await this.epiService.getEpisodes(filter);

            if (!data) {
                return res.status(404).json({ error: "Episode not found" });
            }

            data = await this.format.formattedEpisode(data);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

module.exports = EpisodeController;