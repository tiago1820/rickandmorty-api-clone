import { Character } from '../db.js';
import { CharOrigin } from '../db.js';
import { CharLocation } from '../db.js';
import { CharEpisode } from '../db.js';


import { CharacterService } from '../services/character.service.js';
// import { UserService } from '../services/user.service.js';
import { S3Service } from '../services/s3.service.js';
import { FormattedData } from '../helpers/formattedData.helper.js';
import { HelperIndex } from '../helpers/helperIndex.helper.js';
// import { AuthService } from '../services/auth.service.js';

import dotenv from 'dotenv';
dotenv.config();
const { SECRET } = process.env;

export class CharacterController {
    constructor() {
        this.format = new FormattedData();
        this.charService = new CharacterService();
        // this.auth = new AuthService();
        this.aws = new S3Service();
    }

    index = async (req, res, next) => {
        try {
            // const helper = new HelperIndex(this.auth, this.aws, this.format);
            // const user = await helper.authenticateUser(req.userId, res);
            const filter = helper.validateFilters(req.query, res);
            let data = await this.charService.index(filter);
            data = helper.paginateData(data, req.query.page);
            data = await helper.getImages(data);
            data = await helper.formatCharacterData(data, req.query.page);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    show = async (req, res, next) => {
        // const user = await this.auth.show(req.userId);

        if (!user) {
            return res.status(404).send('No user found');
        }

        try {
            let data = await this.charService.show(req.params.ids);

            if (!data) {
                return res.status(404).json({ error: "No hay registros de characters." });
            }

            data = await this.aws.getImageURL(data);

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
        // const user = await this.auth.show(req.userId);

        // if (!user) {
        //     return res.status(404).send('No user found');
        // }

        try {
            let data = { 'error': '' };

            // validator
            const validator = true;
            if (validator) {
                const { name, status, species, type, gender, origin, location, episode, image } = req.body;
                let imageName = '';
                if (req.files) {
                    imageName = req.files.image.name;
                    await this.aws.uploadFile(req.files.image)
                }

                const characterExists = await Character.count({ where: { name } });

                if (characterExists === 0) {
                    const newCharacter = (await Character.create({
                        name: name,
                        status: status,
                        species: species,
                        type: type,
                        gender: gender,
                        image: imageName
                    })).get({ plain: true });

                    await CharOrigin.create({ charId: newCharacter.id, locationId: origin });
                    await CharLocation.create({ charId: newCharacter.id, locationId: location });
                    await CharEpisode.create({ charId: newCharacter.id, episodeId: episode });

                    data = { ...data, message: `${newCharacter.name} character successfully created.` }

                } else {
                    data['error'] = 'Character already registered!';
                    return res.status(409).json(data);
                }
            } else {
                data['error'] = 'Email already registered!';
                return res.status(409).json(data);
            }

            return res.status(201).json(data);

        } catch (error) {
            data['error'] = 'Internal Server Error';
            return res.status(500).json(data);
        }

    }

    update = async (req, res, next) => {
        // const user = await this.auth.show(req.userId);

        if (!user) {
            return res.status(404).send('No user found');
        }

        const data = req.body;

        try {
            if (req.files) {
                data.image = req.files.image.name;
                await this.aws.uploadFile(req.files.image)
            }

            const result = await this.charService.update(data);

            if (!result) {
                return res.status(404).json({ error: "Error al editar el personaje" });
            }

            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}