const { errorCodeAndMessage } = require("../constant");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case errorCodeAndMessage.VALIDATION_ERROR.code:
      res.json({
        title: errorCodeAndMessage.VALIDATION_ERROR.message,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCodeAndMessage.UNAUTHORIZED.code:
      res.json({
        title: errorCodeAndMessage.UNAUTHORIZED.message,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCodeAndMessage.NOT_FOUND.code:
      res.json({
        title: errorCodeAndMessage.NOT_FOUND.message,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCodeAndMessage.FORBIDDEN.code:
      res.json({
        title: errorCodeAndMessage.FORBIDDEN.message,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case errorCodeAndMessage.SERVER_ERROR.code:
      res.json({
        title: errorCodeAndMessage.SERVER_ERROR.message,
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      break;
  }
};

module.exports = errorHandler;
