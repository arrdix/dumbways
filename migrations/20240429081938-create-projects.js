'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            start: {
                type: Sequelize.DATEONLY,
            },
            end: {
                type: Sequelize.DATEONLY,
            },
            summary: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            technologies: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            image: {
                type: Sequelize.STRING,
            },
            createdAt: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('projects')
    },
}
