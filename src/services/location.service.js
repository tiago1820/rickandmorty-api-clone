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
}

module.exports = LocationService;