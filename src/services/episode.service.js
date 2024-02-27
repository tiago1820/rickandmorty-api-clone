const { Episode } = require("../db.js");

class EpisodeService {

    postEpisode = async (data) => {
        if (data.id) {
            try {
                const [updatedRowsCount, [updatedEpisode]] = await Episode.update(data, {
                    where: {
                        id: data.id
                    },
                    returning: true
                });
                return updatedEpisode;
            } catch (error) {

                throw error;
            }
        } else {
            data.created = new Date().toISOString();
            try {
                const createdEpisode = await Episode.create(data);
                return createdEpisode;
            } catch (error) {
                throw error;
            }
        }
    }

    getOneOrMultipleEpisodes = async (query) => {
        try {
            const episodeIds = query.split(",").map(id => parseInt(id.trim()));

            const episodes = await Episode.findAll({
                where: { id: episodeIds }
            });
            return episodes;
        } catch (error) {
            throw error;
        }
    }

    getEpisodes = async (filter) => {
        try {
            const episodes = await Episode.findAll({ where: filter });
            return episodes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EpisodeService;