const LocationService = require("../services/location.service.js");
const FormattedData = require("../helpers/formattedData.helper.js");

class LocationController {
    constructor() {
        this.locService = new LocationService();
        this.format = new FormattedData();
    }

    postLocation = async (req, res) => {
        const data = req.body;

        try {
            const result = await this.locService.postLocation(data);
            if (result) return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({error: "Error interno del servidor."});
        }
    }

    getOneOrMultipleLocations = async (req, res) => {
        try {
            let data = await this.locService.getOneOrMultipleLocations(req.params.ids);

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

    getLocations = async (req, res) => {
        let { page, ...filter } = req.query;

        if (page && parseInt(page) <= 0) {
            page = 1;
        }

        const allowedFilters = ['name', 'type', 'dimension'];
        const invalidFilters = Object.keys(filter).filter(key => !allowedFilters.includes(key));
        if (invalidFilters.length > 0) {
            return res.status(400).json({error: `Filtros no permitidos: ${invalidFilters.join(', ')}`})
        }

        try {
            let data = await this.locService.getLocations(filter);
            const count = data.length;
            const totalLocations = count;

            if (!data) {
                return res.status(404).json({ "error": "Location not found" });
            }

            if (page) {
                page = parseInt(page);
                if (!isNaN(page) && page > 0) {
                    const pageSize = 20;
                    const startIndex = (page - 1) * pageSize;
                    data = data.slice(startIndex, startIndex + pageSize)
                }
            }

            data = await this.format.formattedLocation(data, page, totalLocations);

            return res.status(200).json(data);
        } catch (error) {

            return res.status(500).json({error: "Error interno del servidor."});
        }
    }
}

module.exports = LocationController;