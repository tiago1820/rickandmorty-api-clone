import { Episode } from '../db.js';

export class EpisodeService {

    index = async (filter) => {
        try {
            const episodes = await Episode.findAll({ where: filter });
            return episodes;
        } catch (error) {
            throw error;
        }
    }

    show = async (query) => {
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

    store = async (data) => {
        data.created = new Date().toISOString();
        try {
            const createdEpisode = await Episode.create(data);
            return createdEpisode;
        } catch (error) {
            throw error;
        }
    }

    update = async (data) => {
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
        }
    }

}