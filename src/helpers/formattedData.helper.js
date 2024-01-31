const { getFileURL } = require("../../s3");

class FormattedData {
    mostrarImagenes = async (characters) => {
        console.log("CHAR: ", characters);



        for (const character of characters) {
            const imageURL = await getFileURL(character.image);
            console.log("URL de imagen obtenida: ", imageURL);
    
            character.image = imageURL;
        }
    
        return characters;
    };
    
    formattedCharacter = async (characters) => {

        console.log("FOTO: ", characters.image);

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







// const { getFileURL } = require("../../s3");


// class FormattedData {
//     mostrarImagenes = async (characters) => {
//         for (const character of characters) {
//             const imageURL = await getFileURL(character.image);
//             console.log("URL de imagen obtenida: ", imageURL);
    
//             character.image = imageURL;
//             return characters;
//         }
    
        
//     };
    
//     formattedCharacter = (characters) => {

//         this.mostrarImagenes(characters);


//         console.log("FOTO: ", characters.image);
//         const formatted = {
//             info: {
//                 count: characters.length,
//                 pages: 1,
//                 next: null,
//                 prev: null
//             },
//             results: characters
//         }

//         return formatted;
//     }
// }

// module.exports = FormattedData;