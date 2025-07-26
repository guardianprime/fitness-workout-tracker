const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_URI);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.User = require("./User")(sequelize, DataTypes);
db.Exercise = require("./Exercise")(sequelize, DataTypes);
db.WorkoutPlan = require("./WorkoutPlan")(sequelize, DataTypes);
db.WorkoutPlanExercise = require("./WorkoutPlanExercise")(sequelize, DataTypes);
db.WorkoutLog = require("./WorkoutLog")(sequelize, DataTypes);
db.WorkoutLogEntry = require("./WorkoutLogEntry")(sequelize, DataTypes);

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

module.exports = db;
