module.exports = (sequelize, DataTypes) => {
    const University = sequelize.define('University', {
      uni_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uni_name: DataTypes.STRING,
      uni_website: DataTypes.STRING,
      uni_email: DataTypes.STRING,
      uni_phone: DataTypes.STRING,
      uni_address: DataTypes.STRING,
      uni_province: DataTypes.STRING,
      uni_rector_name: DataTypes.STRING,
      uni_rector_surname: DataTypes.STRING,
      uni_email_structure: DataTypes.STRING,
      uni_rate: DataTypes.FLOAT,
      uni_rate_count: DataTypes.INTEGER,
      uni_avg_rate:DataTypes.FLOAT,
      uni_comment_count: DataTypes.INTEGER,
      uni_urap_score:DataTypes.FLOAT,
      compound_score:DataTypes.FLOAT,
      uni_rank:DataTypes.INTEGER,      
      uni_yokatlas_link: DataTypes.STRING,
      is_governmental:DataTypes.INTEGER,
      uni_logo: DataTypes.STRING,
      uni_wp: DataTypes.STRING
    }, {
      tableName: 'universities',
      timestamps: false
    });
  
    University.associate = (models) => {
      University.hasMany(models.Student, { foreignKey: 'uni_id' });
      University.hasMany(models.Rate, { foreignKey: 'uni_id' });
    };
  
    return University;
  };
  