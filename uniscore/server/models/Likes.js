module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        com_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'rates',
                key: 'com_id'
            }
        },
        stu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'students',
                key: 'stu_id'
            }
        },
        like_value: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'likes',
        timestamps: false
    });

    Like.associate = (models) => {
        Like.belongsTo(models.Rate, { foreignKey: 'com_id' });
        Like.belongsTo(models.Student, { foreignKey: 'stu_id' });
    };

    return Like;
};
