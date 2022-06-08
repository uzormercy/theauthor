require("dotenv").config();
const express = require("express");
const routes = require("@app/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
module.exports = app;
