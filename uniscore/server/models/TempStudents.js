module.exports = (sequelize, DataTypes) => {
    const TempStudent = sequelize.define('TempStudent', {
      stu_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      stu_name: DataTypes.STRING,
      stu_surname: DataTypes.STRING,
      stu_mail: DataTypes.STRING,
      stu_pw: DataTypes.STRING,
      stu_phone: DataTypes.STRING,
      promotional: DataTypes.BOOLEAN,
      verificationCode:DataTypes.STRING,
      uni_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'University',
          key: 'uni_id'
        }
      },
      is_anon: DataTypes.BOOLEAN
    }, {
      tableName: 'temp_students',
      timestamps: false
    });
  
    TempStudent.associate = (models) => {
      TempStudent.belongsTo(models.University, { foreignKey: 'uni_id' });
      TempStudent.hasMany(models.Rate, { foreignKey: 'stu_id' });
    };
  
    return TempStudent;
  };
  