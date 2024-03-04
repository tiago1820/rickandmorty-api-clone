import { Location } from '../db.js';
import { BASE_URL } from '../../config.js';

export class LocationService {

    index = async (filter) => {
        try {
            const locations = await Location.findAll({ where: filter });
            return locations;
        } catch (error) {
            throw error;
        }
    }

    show = async (query) => {
        try {
            const locationIds = query.split(",").map(id => parseInt(id.trim()));

            const locations = await Location.findAll({
                where: { id: locationIds }
            });
            return locations;
        } catch (error) {
            throw error;
        }
    }

    store = async (data) => {
        data.created = new Date().toISOString();
        try {
            const createdLocation = await Location.create(data);
            const id = createdLocation.id;
            const url = `${BASE_URL}location/` + id;

            createdLocation.url = url
            await createdLocation.save();

            return createdLocation;
        } catch (error) {
            throw error;
        }
    }

    update = async (data) => {
        if (data.id) {
            try {
                const [updatedRowsCount, [updatedLocation]] = await Location.update(data, {
                    where: {
                        id: data.id
                    },
                    returning: true
                });
                return updatedLocation;
            } catch (error) {
                throw error;
            }
        }
    }
}