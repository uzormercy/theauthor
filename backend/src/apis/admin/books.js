const Book = require("@models/Book");
const winston = require("winston");
const { v4: uuid } = require("uuid");
const Future = require("fluture");
const R = require("ramda");

const trace = (msg) => (x) => {
  console.log(msg, x);
  return x;
};

const validateModel = (model) => (payload) =>
  Future((rej, res) => {
    model
      .validate(payload)
      .then(() => res(payload))
      .catch((error) => rej(error));
    return () => {};
  });

const saveModel = (model) =>
  Future((rej, res) => {
    model.save().then(res).catch(rej);
    return () => {};
  });

const response = (status) => (message) => (_res) => (data) => {
  return _res
    .status(status)
    .send(data ? { status, message, data } : { status, message });
};

const bookSuccess = response(200)("Book created");
const bookFailed = response(400)("Unable to create book");

const store = async (req, res) => {
  winston.info("Creating a new book");

  const createBook = R.pipe(
    trace("book payload"),
    validateModel(Book),
    R.map(R.set(R.lensProp("_id"), uuid())),
    R.map((data) => Book.of(data)),
    R.chain((model) => saveModel(model))
  );

  const onError = R.compose(
    bookFailed(res),
    R.path(["errors"]),
    R.tap(winston.error)
  );

  Future.fork(onError)(bookSuccess(res))(createBook(req.body));
};

module.exports = {
  store,
};
