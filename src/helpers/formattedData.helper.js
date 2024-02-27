const { BASE_URL } = require('../../config');

class FormattedData {
    formattedCharacter = async (characters, currentPage = 1, totalCharacters) => {
        let totalPages = Math.floor(totalCharacters / 20);
        if (totalPages < 1) {
            totalPages = 1;
        }

        let nextPage = currentPage + 1;
        let prevPage = currentPage - 1;

        if (nextPage > totalPages) {
            nextPage = 1;
        }

        if (prevPage < 1) {
            prevPage = totalPages
        }

        const formatted = {
            info: {
                count: totalCharacters,
                pages: totalPages,
                next: `${BASE_URL}character/${nextPage}`,
                prev: `${BASE_URL}character/${prevPage}`
            },
            results: characters
        };

        return formatted;
    };

    formattedLocation = async (locations, currentPage = 1, totalLocations) => {
        let totalPages = Math.floor(totalLocations / 20);
        if (totalPages < 1) {
            totalPages = 1;
        }

        let nextPage = currentPage + 1;
        let prevPage = currentPage - 1;

        if (nextPage > totalPages) {
            nextPage = 1;
        }

        if (prevPage < 1) {
            prevPage = totalPages
        }

        const formatted = {
            info: {
                count: totalLocations,
                pages: totalPages,
                next: `${BASE_URL}location/${nextPage}`,
                prev: `${BASE_URL}location/${prevPage}`
            },
            results: locations
        }

        return formatted;
    }

    formattedEpisode = async (episodes) => {
        const formatted = {
            info: {
                count: episodes.length,
                pages: 1,
                next: null,
                prev: null
            },
            results: episodes
        }

        return formatted;
    }
}

module.exports = FormattedData;