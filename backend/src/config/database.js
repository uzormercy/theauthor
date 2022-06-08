const mongoose = require("mongoose");
const winston = require("winston");

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(`${process.env.DB_CONNECTION}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => winston.error(error));
  mongoose.connection.on("open", () => winston.info("MongoDB connected"));
}

module.exports = database;
