module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: {
      type: DataTypes.ENUM("cardio", "strength", "flexibility"),
      allowNull: false,
    },
    muscleGroup: { type: DataTypes.STRING },
  });

  Exercise.associate = (models) => {
    Exercise.belongsToMany(models.WorkoutPlan, {
      through: models.WorkoutPlanExercise,
      foreignKey: "exerciseId",
    });

    Exercise.hasMany(models.WorkoutLogEntry, { foreignKey: "exerciseId" });
  };

  return Exercise;
};
