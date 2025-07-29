const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME, // database
  process.env.DB_USER, // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false, // optional
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.User = require("./models/User")(sequelize, DataTypes);
db.Exercise = require("./models/Exercise")(sequelize, DataTypes);
db.Workout = require("./models/Workout")(sequelize, DataTypes);

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

module.exports = db;
