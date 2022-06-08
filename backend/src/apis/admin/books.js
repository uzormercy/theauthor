const Book = require("@models/Book");
const winston = require("winston");
const { v4: uuid } = require("uuid");

const store = async (req, res) => {
  try {
    winston.info("Creating a new book");
    const final = req.body;
    final._id = uuid();
    const data = await Book.validate(final);
    const model = new Book(data);
    await model.save();

    return res.status(200).send({
      status: 200,
      message: "Book Added successfully",
      data: model.toJSON(),
    });
  } catch (error) {
    winston.error(error.message);
    return res.status(422).send({
      status: 422,
      error: error.errors,
    });
  }
};

module.exports = {
  store,
};
