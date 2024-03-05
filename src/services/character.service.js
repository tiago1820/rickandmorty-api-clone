import { Character, Location, Episode } from "../db.js";

export class CharacterService {

    index = async (filter) => {
        try {
            const result = await Character.findAll({ where: filter });
            const characters = result.map(item => item.dataValues);
            const characterOrigins = [];
            const characterLocations = [];

            for (const character of characters) {
                let origin = null;
                let location = null;
                let episode = null

                if (character.origin && character.origin.id) {
                    origin = await this.getLocationOrOriginDetails(character.origin.id);
                }

                if (character.location && character.location.id) {
                    location = await this.getLocationOrOriginDetails(character.location.id);
                }

                if (character.episode && character.episode.id) {

                }

                characterOrigins.push(origin);
                characterLocations.push(location);
            }

            for (let i = 0; i < characters.length; i++) {
                characters[i].origin = characterOrigins[i] ? { name: characterOrigins[i].name, url: characterOrigins[i].url } : null;
                characters[i].location = characterLocations[i] ? { name: characterLocations[i].name, url: characterLocations[i].url } : null;
            }

            return characters;
        } catch (error) {
            console.log("ERROR: ", error);
            throw error;
        }
    }

    show = async (query) => {

        try {
            const characterIds = query.split(",").map(id => parseInt(id.trim()));
            const result = await Character.findAll({ where: { id: characterIds } });
            const characters = result.map(item => item.dataValues);
            const characterOrigins = [];
            const characterLocations = [];

            for (const character of characters) {
                let origin = null;
                let location = null;

                if (character.origin && character.origin.id) {
                    origin = await this.getLocationOrOriginDetails(character.origin.id);
                }

                if (character.location && character.location.id) {
                    location = await this.getLocationOrOriginDetails(character.location.id);
                }

                characterOrigins.push(origin);
                characterLocations.push(location);
            }

            for (let i = 0; i < characters.length; i++) {
                characters[i].origin = characterOrigins[i] ? { name: characterOrigins[i].name, url: characterOrigins[i].url } : null;
                characters[i].location = characterLocations[i] ? { name: characterLocations[i].name, url: characterLocations[i].url } : null;
            }

            return characters;
        } catch (error) {
            throw error;
        }
    }

    store = async (data) => {
        try {
            const info = {
                name: data.name,
                status: data.status,
                species: data.species,
                gender: data.gender,
                image: data.image,
                origin: { id: data.origin },
                location: { id: data.location },
                created: new Date().toISOString()
            };

            const { dataValues } = await Character.create(info);
            const { id: charId } = dataValues;

            const characterUrl = `http://localhost:3001/api/character/${charId}`;
            const episodeUrl = `http://localhost:3001/api/episode/${data.episode}`;

            let episode = dataValues.episode ? [...dataValues.episode] : [];
            episode.push(episodeUrl);

            await Character.update({ url: characterUrl, episode }, { where: { id: charId } });

            const [location] = await Location.findAll({ where: { id: data.location } });
            let residents = location.dataValues.residents ?? [];
            residents.push(characterUrl);
            await Location.update({ residents }, { where: { id: data.location } });

            const [oneEpisode] = await Episode.findAll({ where: { id: data.episode } });
            let { characters = [] } = oneEpisode.dataValues;
            characters.push(characterUrl);

            await Episode.update({ characters }, { where: { id: data.episode } });

            return { success: true, message: 'The character was created successfully.' };

        } catch (error) {
            return { success: false, message: 'Failed to create the character.' };
        }
    }


    update = async (data) => {
        if (data.id) {
            try {
                const characterId = data.id;
                const characterUrl = "http://localhost:3001/api/character/" + characterId;
                const episodeUrl = "http://localhost:3001/api/episode/" + data.episode;

                await Character.update({
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    gender: data.gender,
                    image: data.image,
                    origin: { id: data.origin },
                    location: { id: data.location },
                    created: new Date().toISOString(),
                    url: characterUrl
                }, { where: { id: characterId } });

                const [location] = await Location.findAll({ where: { id: data.location } });
                let { residents } = location.dataValues;
                residents = residents ?? [];

                if (!residents.includes(characterUrl)) {
                    await Location.update(
                        { residents: [...residents, characterUrl] },
                        { where: { id: data.location } }
                    );
                }

                const [oneEpisode] = await Episode.findAll({ where: { id: data.episode } });
                let { characters } = oneEpisode.dataValues;
                characters = characters ?? [];

                if (!characters.includes(characterUrl)) {
                    characters.push(characterUrl);
                    await Episode.update(
                        { characters: characters },
                        { where: { id: data.episode } }
                    );

                    let character = await Character.findByPk(characterId);
                    let { episode } = character.dataValues;
                    episode = episode ?? [];

                    if (!episode.includes(episodeUrl)) {
                        episode.push(episodeUrl);
                        await Character.update(
                            { episode: episode },
                            { where: { id: characterId } }
                        );
                    }
                }

                return { success: true, message: 'The character was updated successfully.' };

            } catch (error) {
                return { success: false, message: 'Failed to update the character.' };
            }
        }
    }

    getLocationOrOriginDetails = async (id) => {
        if (id) {
            return await Location.findByPk(id, { attributes: ['name', 'url'] });
        } else {
            return null;
        }
    }

    countAllCharacters = async () => {
        try {
            const count = await Character.count();
            return count;
        } catch (error) {
            throw error;
        }
    }

}