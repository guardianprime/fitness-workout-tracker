const userModel = (sequelize, DataTypes) => {
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

userModel.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// you will also need to add a method to compare the password provided by the user with the hashed password stored in the database;
userModel.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = userModel;
