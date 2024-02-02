
class FormattedData {
    
    formattedCharacter = async (characters) => {


        const formatted = {
            info: {
                count: characters.length,
                pages: 1,
                next: null,
                prev: null
            },
            results: characters
        }

        return formatted;
    }
}

module.exports = FormattedData;