module.exports = (sequelize, DataTypes) => {
  const WorkoutLogEntry = sequelize.define("WorkoutLogEntry", {
    // Add any additional fields if needed
    // e.g. reps, sets, weight, duration, etc.
    reps: { type: DataTypes.INTEGER },
    sets: { type: DataTypes.INTEGER },
    weight: { type: DataTypes.FLOAT },
    duration: { type: DataTypes.INTEGER }, // in minutes
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
  return WorkoutLogEntry;
};
