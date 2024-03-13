import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("Character", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM("alive", "dead", "unknown")
        },
        species: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM("female", "male", "genderless", "unknown")
        },
        image: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
}