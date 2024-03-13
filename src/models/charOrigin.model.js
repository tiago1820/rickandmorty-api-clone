import { DataTypes } from "sequelize";

export default (sequelize) => {
    sequelize.define("CharOrigin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        charId: {
            type: DataTypes.INTEGER,                        
        },
        locationId: {
            type: DataTypes.INTEGER,                        
        },
        created: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
}