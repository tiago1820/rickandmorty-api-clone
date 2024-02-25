const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
            type: DataTypes.ENUM("Alive", "Dead", "unknown")
        },
        species: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown")
        },
        origin: {
            type: DataTypes.JSONB
        },
        location: {
            type: DataTypes.JSONB
        },
        image: {
            type: DataTypes.STRING
        },
        episode: {
            type: DataTypes.JSONB
        },
        url: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
}