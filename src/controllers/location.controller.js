const LocationService = require("../services/location.service.js");

class LocationController {
    constructor() {
        this.locService = new LocationService();
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
}

module.exports = LocationController;