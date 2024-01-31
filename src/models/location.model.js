const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Location", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        dimension: {
            type: DataTypes.STRING
        },
        residents: {
            type: DataTypes.ARRAY(DataTypes.STRING)
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