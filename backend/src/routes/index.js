const _adminBookRoutes = require("./admin/booksRoutes");

module.exports = (app) => {
  app.use("/api/v1", _adminBookRoutes);
};
