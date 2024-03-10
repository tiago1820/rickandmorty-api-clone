export class HelperIndex {
    constructor(auth, aws, format) {
        this.auth = auth;
        this.aws = aws;
        this.format = format;
    }

    async authenticateUser(userId, res) {
        const user = await this.auth.show(userId);
        if (!user) {
            return res.status(404).send('No user found');
        }
        return user;
    }

    validateFilters(query, res) {
        let { page, ...filter } = query;
        if (page && parseInt(page) <= 0) {
            page = 1;
        }
        const allowedFilters = ['name', 'status', 'species', 'type', 'gender'];
        const invalidFilters = Object.keys(filter).filter(key => !allowedFilters.includes(key));
        if (invalidFilters.length > 0) {
            return res.status(400).json({ error: `Filtros no permitidos: ${invalidFilters.join(', ')}` })
        }
        return filter;
    }

    paginateData(data, page) {
        if (page) {
            page = parseInt(page);
            if (!isNaN(page) && page > 0) {
                const pageSize = 20;
                const startIndex = (page - 1) * pageSize;
                data = data.slice(startIndex, startIndex + pageSize)
            }
        }
        return data;
    }

    async getImages(data) {
        return await this.aws.getImageURL(data);
    }

    async formatCharacterData(data, page) {
        const totalCharacters = data.length;
        return await this.format.formattedCharacter(data, page, totalCharacters);
    }
}