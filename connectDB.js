const Sequelize = require("sequelize");

const database = "postgres";
const username = "postgres";
const password = "prabase";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});
const connect = async () => {
  return sequelize.authenticate();
};
module.exports = {
  connect,
  sequelize,
};
