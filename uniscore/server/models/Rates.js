module.exports = (sequelize, DataTypes) => {
    const Rate = sequelize.define('Rate', {
      com_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      com: DataTypes.TEXT,
      rate_amount: DataTypes.INTEGER,
      like_dislike: DataTypes.INTEGER,
      complaint: DataTypes.INTEGER,
      uni_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'University',
          key: 'uni_id'
        }
      },
      visibility: DataTypes.BOOLEAN,
      stu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Student',
          key: 'stu_id'
        }
      }
    }, {
      tableName: 'rates',
      timestamps: false,
      unique: 'unique_rating' //yeni eklendi
    });
  
    Rate.associate = (models) => {
      Rate.belongsTo(models.Student, { foreignKey: 'stu_id' });
      Rate.belongsTo(models.University, { foreignKey: 'uni_id' });
    };
  
    return Rate;
  };
  