/**
 * @desc: Function is defined to generate error Object for the given errorType
 * @param {*} errType : String
 * @returns Object
 */
const errorObject = (errType) => {
  const err = new Error();
  err.name = errType;
  return err;
};

/**
 * @desc: Function is defined to return the response object
 * @param {*} res : Object
 * @param {*} status : string
 * @param {*} responseBody : Object
 * @param {*} responseMessage : string
 * @returns : Object {statusCode, status, body, message}
 */
const responseHandler = ({
  res,
  status,
  responseBody = null,
  responseMessage = null,
}) => {
  return {
    statusCode: res.statusCode,
    status,
    body: responseBody,
    message: responseMessage,
  };
};

/**
 * @desc: Function is defined to handle thrown errors
 * @param {*} err : Object
 * @param {*} req : Object
 * @param {*} res : Object
 * @param {*} next : Function
 * @returns res: Configured response object
 */
const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json(
      responseHandler({
        res,
        status: "error",
        responseData: null,
        responseMessage: err,
      })
    );
  }

  switch (err.name) {
    case "ValidationError":
      return res.status(400).json(
        responseHandler({
          res,
          status: "error",
          responseBody: null,
          responseMessage: err.message,
        })
      );
    case "UnauthorizedError":
      return res.status(401).json(
        responseHandler({
          res,
          status: "error",
          responseBody: null,
          responseMessage: "Unauthorized. Invalid Token",
        })
      );
    case "InvalidCredentials":
      return res.status(401).json(
        responseHandler({
          res,
          status: "error",
          responseBody: null,
          responseMessage: "Bad Credentials. Username or password is incorrect",
        })
      );
    case "NoCredentialFound":
      return res.status(401).json(
        responseHandler({
          res,
          status: "error",
          responseBody: null,
          responseMessage: "No Credentials found",
        })
      );
    case "FileOperationError":
      return res.status(500).json(
        responseHandler({
          res,
          status: "error",
          responseBody: null,
          responseMessage: "Error while reading/writing in data source",
        })
      );
    default:
      return res
        .status(500)
        .json(
          responseHandler({
            res,
            status: "error",
            responseBody: null,
            responseMessage: err.message,
          })
        );
  }
};

module.exports = { errorObject, responseHandler, errorHandler };
