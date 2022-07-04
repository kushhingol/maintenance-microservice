const express = require("express");
const router = express.Router();
const utilsService = require("../utils/utils");
const maintenanceService = require("./maintenance.service");
const verifyTokenMiddleware = require("../middleware/authorize");
let clients = [];

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
      res.json(
        utilsService.responseHandler({
          res,
          status: "success",
          responseBody: data,
          responseMessage: "Maintenance Window Added Successfully!",
        })
      );
      sendEventsToAll(data)
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

function sendEventsToAll(maintenanceData) {
  clients.forEach(client => {
    console.log(client.id)
    client.response.write(`data: ${JSON.stringify(maintenanceData)}\n\n`)
  })
}

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

  response.write("Connected");

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };
  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

router.post("/add-maintenance", verifyTokenMiddleware, addMaintenanceData);
router.get("/get-all-mainteance", getAllMainteanceData);
router.delete("/clear-maintenance-data", clearMaintenanceData);
router.get("/maintenance-events", addMaintenanceEvent);

module.exports = router;
