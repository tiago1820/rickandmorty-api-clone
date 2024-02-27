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
            return res.status(500).send("Error interno del servidor.");
        }
    }

    getOneOrMultipleLocations = async (req, res) => {
        try {
            let data = await this.locService.getOneOrMultipleLocations(req.params.ids);

            if (!data) {
                return res.status(404).json({ error: "No hay registros de characters." })
            }

            data = await this.format.formattedLocation(data);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    getLocations = async (req, res) => {
        const filter = req.query;

        try {
            let data = await this.locService.getLocations(filter);

            if (!data) {
                return res.status(404).json({ "error": "Location not found" });
            }

            data = await this.format.formattedLocation(data);

            return res.status(200).json(data);
        } catch (error) {

            return res.status(500).send("Error interno del servidor.");
        }
    }
}

module.exports = LocationController;