const sequelize = require("../configs/sequelize");

const courseModel = require("./course");
const userModel = require("./user");

// relasi one to many
userModel.hasMany(courseModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Tiap Course adalah milik dari 1 User
courseModel.belongsTo(userModel, {
  foreignKey: "user_id",
});

module.exports = {
  sequelize,
  courseModel,
  userModel,
};
