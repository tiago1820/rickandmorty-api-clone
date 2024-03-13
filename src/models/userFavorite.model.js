import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("UserFavorite", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,                        
        },
        charId: {
            type: DataTypes.INTEGER,                        
        },
        created: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
}