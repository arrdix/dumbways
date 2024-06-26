'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class projects extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            projects.belongsTo(models.users, {
                foreignKey: 'userId',
                as: 'author',
            })
        }
    }
    projects.init(
        {
            name: DataTypes.STRING,
            start: DataTypes.DATE,
            end: DataTypes.DATE,
            summary: DataTypes.STRING,
            description: DataTypes.TEXT,
            technologies: DataTypes.ARRAY(DataTypes.STRING),
            image: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'projects',
        }
    )
    return projects
}
