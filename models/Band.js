const { db, DataTypes, Model } = require("../db");
//const {db, DataTypes, Model} = require("./db/connection.js")

// TODO - define the Band model
class Band extends Model {}

Band.init(
  {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Band",
  }
);

module.exports = {
  Band,
};
