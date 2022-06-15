const status = require("./responseStatusCode");

const success = (res) => {
  return res.status(200).send({
    status: status.SUCCESS,
  });
};

const successWithMessage = (res, message) => {
  return res.status(200).send({
    status: status.SUCCESS,
    message,
  });
};

const successWithMessageAndData = (res, message, data) => {
  return res.status(200).send({
    status: status.SUCCESS,
    message,
    data,
  });
};
