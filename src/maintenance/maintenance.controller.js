const express = require("express");
const router = express.Router();
const utilsService = require("../utils/utils");
const maintenanceService = require("./maintenance.service");
const verifyTokenMiddleware = require("../middleware/authorize");
const mq = require("mqemitter");
const emitter = mq({ concurrency: 5 });
const topicName = "maintenace-message";

/**
 * @desc: Function is defined to handle the /add-maintenance route
 * @param {*} req : Object (Request Object)
 * @param {*} res : Object (Response Object)
 * @param {*} next : A callback function
 */
const addMaintenanceData = async (req, res, next) => {
  try {
    const { success, data } = await maintenanceService.addData(req.body);
    if (success && data) {
      const message = { topic: topicName, payload: JSON.stringify(data) };
      emitter.emit(message);
      res.json(
        utilsService.responseHandler({
          res,
          status: "success",
          responseBody: data,
          responseMessage: "Maintenance Window Added Successfully!",
        })
      );
    } else {
      throw utilsService.errorObject("FileOperationError");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc: Function is defined to handle /get-all-mainteance route
 * @param {*} req : Object (Request Object)
 * @param {*} res : Object (Response Object)
 * @param {*} next : A callback function
 */
const getAllMainteanceData = (req, res, next) => {
  maintenanceService
    .getAllData()
    .then((data) =>
      data
        ? res.json(
            utilsService.responseHandler({
              res,
              status: "success",
              responseBody: data,
              responseMessage: "",
            })
          )
        : (function () {
            throw utilsService.errorObject("FileOperationError");
          })()
    )
    .catch((err) => next(err));
};

/**
 * @desc: Function is defined to handle /clear-maintenance-data route
 * @param {*} req : Object (Request Object)
 * @param {*} res : Object (Response Object)
 * @param {*} next : A callback function
 */
const clearMaintenanceData = async (req, res, next) => {
  try {
    const { success } = await maintenanceService.clearAllData();
    if (success) {
      res.json(
        utilsService.responseHandler({
          res,
          status: "success",
          responseBody: [],
          responseMessage: "All maintenance timelines deleted Successfully",
        })
      );
    } else {
      throw utilsService.errorObject("FileOperationError");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc: Function is defined to manage /maintenance-events route
 * @param {*} request : Object (Request Object)
 * @param {*} response : Object (Response Object)
 * @param {*} next : A callback function
 */
const addMaintenanceEvent = (request, response, next) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  emitter.on(topicName, function (message, cb) {
    const data = JSON.stringify(message.payload);
    response.write(data);
    cb();
  });

  request.on("close", () => {
    console.log("Connection closed");
  });
};

router.post("/add-maintenance", verifyTokenMiddleware, addMaintenanceData);
router.get("/get-all-mainteance", getAllMainteanceData);
router.delete("/clear-maintenance-data", clearMaintenanceData);
router.get("/maintenance-events", addMaintenanceEvent);

module.exports = router;
