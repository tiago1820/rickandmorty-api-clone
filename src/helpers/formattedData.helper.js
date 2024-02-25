const { BASE_URL } = require('../../config');

class FormattedData {

    formattedCharacter = async (characters, currentPage, totalCharacters) => {
        const count = totalCharacters;
        const totalPages = Math.floor(totalCharacters / 20);

        const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
        const prevPage = currentPage > 1 ? currentPage - 1 : totalPages;

        console.log("AQUI: ", totalCharacters);

        const formatted = {
            info: {
                count: count,
                pages: totalPages,
                next: nextPage ? `${BASE_URL}character/?page=${nextPage}` : null,
                prev: prevPage ? `${BASE_URL}character/?page=${prevPage}` : null
            },
            results: characters
        }

        return formatted;
    }

    formattedLocation = async (locations) => {
        const formatted = {
            info: {
                count: locations.length,
                pages: 1,
                next: null,
                prev: null
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