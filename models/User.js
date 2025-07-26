module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  User.associate = (models) => {
    User.hasMany(models.WorkoutPlan, { foreignKey: "userId" });
    User.hasMany(models.WorkoutLog, { foreignKey: "userId" });
  };

  return User;
};
