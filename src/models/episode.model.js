import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("Episode", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        air_date: {
            type: DataTypes.STRING
        },
        episode: {
            type: DataTypes.STRING
        },
        characters: {
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

};