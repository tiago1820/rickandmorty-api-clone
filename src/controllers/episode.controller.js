const EpisodeService = require("../services/episode.service.js");
const FormattedData = require("../helpers/formattedData.helper.js");

class EpisodeController {
    constructor() {
        this.epiService = new EpisodeService();
    }

    postEpisode = async (req, res) => {
        const data = req.body;

        console.log("Data: ", data);

        try {
            const result = await this.epiService.postEpisode(data);
            if (result) {
                return res.status(201).json(result);
            }
        } catch (error) {
            console.log("Tiago: ", error);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

module.exports = EpisodeController;