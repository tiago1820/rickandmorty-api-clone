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

            if (data.length === 1) {
                data = data[0];
                return res.status(200).json(data);
            } else {
                return res.status(200).json(data);
            }
            
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    getEpisodes = async (req, res) => {
        let { page, ...filter } = req.query;

        if (page && parseInt(page) <= 0) {
            page = 1;
        }

        const allowedFilters = ['name', 'episode'];
        const invalidFilters = Object.keys(filter).filter(key => !allowedFilters.includes(key));
        if (invalidFilters.length > 0) {
            return res.status(400).send(`Filtros no permitidos: ${invalidFilters.join(', ')}`)
        }

        try {
            let data = await this.epiService.getEpisodes(filter);
            const count = data.length;
            const totalEpisodes = count;

            if (!data) {
                return res.status(404).json({ error: "Episode not found" });
            }

            if (page) {
                page = parseInt(page);
                if (!isNaN(page) && page > 0) {
                    const pageSize = 20;
                    const startIndex = (page - 1) * pageSize;
                    data = data.slice(startIndex, startIndex + pageSize)
                }
            }

            data = await this.format.formattedEpisode(data, page, totalEpisodes);

            return res.status(200).json(data);
        } catch (error) {
            console.log("AQUI: ", error);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

module.exports = EpisodeController;