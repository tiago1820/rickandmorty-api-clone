const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Auth', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
}