const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('task', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Contact = sequelize.define('Contact', {
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    linkPrecedence: {
        type: DataTypes.ENUM('primary', 'secondary'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

sequelize.sync();

module.exports = { Contact, sequelize };
