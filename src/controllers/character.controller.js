import { CharacterService } from '../services/character.service.js';
// import { UserService } from '../services/user.service.js';
import { S3Service } from '../services/s3.service.js';
import { FormattedData } from '../helpers/formattedData.helper.js';
import { HelperIndex } from '../helpers/helperIndex.helper.js';

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

        if (!user) {
            return res.status(404).send('No user found');
        }

        const data = req.body;

        try {
            if (req.files) {
                data.image = req.files.image.name;
                await this.aws.uploadFile(req.files.image)
            }

            const result = await this.charService.store(data);

            if (!result) {
                return res.status(404).json({ error: "Error al crear o editar el personaje" });
            }

            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor." });
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