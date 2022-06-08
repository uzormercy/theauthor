require("module-alias/register");
require("dotenv").config();
const express = require("express");
const routes = require("@app/routes");
const morgan = require("morgan");
const app = express();
require("@app/services/logger");

app.use(morgan("dev"), express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
module.exports = app;
