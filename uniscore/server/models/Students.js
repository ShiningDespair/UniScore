module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
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
      uni_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'University',
          key: 'uni_id'
        }
      },
      is_anon: DataTypes.BOOLEAN
    }, {
      tableName: 'students',
      timestamps: false
    });
  
    Student.associate = (models) => {
      Student.belongsTo(models.University, { foreignKey: 'uni_id' });
      Student.hasMany(models.Rate, { foreignKey: 'stu_id' });
    };
  
    return Student;
  };
  