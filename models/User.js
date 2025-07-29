const bcrypt = require("bcrypt");

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
          }
        },
      },
    }
  );

  // Define associations
  User.associate = (models) => {
    User.hasMany(models.WorkoutPlan, { foreignKey: "userId" });
    User.hasMany(models.WorkoutLog, { foreignKey: "userId" });
  };

  // Instance method to check password
  User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

module.exports = userModel;
