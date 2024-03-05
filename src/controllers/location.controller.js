import { LocationService } from '../services/location.service.js';
import { FormattedData } from '../helpers/formattedData.helper.js';

export class LocationController {
    constructor() {
        this.locService = new LocationService();
        this.format = new FormattedData();
    }

    index = async (req, res, next) => {
        const user = await this.auth.show(req.userId);

        if (!user) {
            return res.status(404).send('No user found');
        }

        let { page, ...filter } = req.query;

        if (page && parseInt(page) <= 0) {
            page = 1;
        }

        const allowedFilters = ['name', 'type', 'dimension'];
        const invalidFilters = Object.keys(filter).filter(key => !allowedFilters.includes(key));
        if (invalidFilters.length > 0) {
            return res.status(400).json({ error: `Filtros no permitidos: ${invalidFilters.join(', ')}` })
        }

        try {
            let data = await this.locService.index(filter);
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

            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    show = async (req, res, next) => {
        const user = await this.auth.show(req.userId);

        if (!user) {
            return res.status(404).send('No user found');
        }

        try {
            let data = await this.locService.show(req.params.ids);

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

    store = async (req, res, next) => {
        const user = await this.auth.show(req.userId);

        if (!user) {
            return res.status(404).send('No user found');
        }

        const data = req.body;

        try {
            const result = await this.locService.store(data);
            if (result) return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    update = async (req, res, next) => {
        const user = await this.auth.show(req.userId);

        if (!user) {
            return res.status(404).send('No user found');
        }
        
        const data = req.body;

        try {
            const result = await this.locService.update(data);
            if (result) return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

}