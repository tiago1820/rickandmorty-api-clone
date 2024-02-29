const { CHARACTER_URL, LOCATION, EPISODE } = require("../constants");

class APIController {

    getApiInfo = async (req, res) => {
        try {
            const apiInfo = {
                characters: CHARACTER_URL,
                locations: LOCATION,
                episodes: EPISODE
            };

            return res.status(200).json(apiInfo);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

module.exports = APIController;