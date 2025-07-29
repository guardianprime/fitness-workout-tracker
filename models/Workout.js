const workoutModel = (sequelize, DataTypes) => {
  const Workout = sequelize.define("Workout", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // must match the table name or model name
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Workout.associate = (models) => {
    Workout.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Workout;
};

module.exports = workoutModel;
