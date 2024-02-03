const { Location } = require("../db.js");

class LocationService {

    postLocation = async (data) => {
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
        } else {
            data.created = new Date().toISOString();
            try {
                const createdLocation = await Location.create(data);
                return createdLocation;
            } catch (error) {
                throw error;
            }
        }
    }

    getOneOrMultipleLocations = async (query) => {
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

    getLocations = async (filter) => {
        try {
            const locations = await Location.findAll({ where: filter });
            return locations;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = LocationService;