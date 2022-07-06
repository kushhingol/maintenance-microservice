const utilsService = require("../utils/utils");
const Maintenance = require("./maintenance.model");

/**
 * @desc: Function is defined to add the maintenance timelines
 * @param {*} maintenanceData : Object {name, start_date, start_time, end_date, end_time}
 * @returns  Promise<{name, start_date, start_time, end_date, end_time}>
 */
const addData = async (maintenanceData) => {
  const { name, start_date, start_time, end_date, end_time } = maintenanceData;
  const isValidData = name && start_date && start_time && end_date && end_time;
  if (isValidData) {
    const newMaintenanceData = new Maintenance(maintenanceData);
    return new Promise((resolve, reject) => {
      Maintenance.create(newMaintenanceData, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(newMaintenanceData);
        }
      });
    });
  } else {
    throw utilsService.errorObject("FileOperationError");
  }
};

/**
 * @desc: Function is defined to get all maintenance data from the json data store
 * @returns Promise<{name, start_date, start_time, end_date, end_time}[]>
 */
const getAllData = () => {
  return new Promise((resolve, reject) => {
    Maintenance.findAll((err, allMaintenanceData) => {
      if (err) {
        reject(err);
      } else {
        resolve(allMaintenanceData);
      }
    });
  });
};

/**
 * @desc: Function is defined to clear all mainteance data from the json data store
 * @returns: Promise
 */
const clearAllData = async () => {
  return new Promise((resolve, reject) => {
    Maintenance.deleteAll((err, allMaintenanceData) => {
      if (err) {
        reject(err);
      } else {
        resolve(allMaintenanceData);
      }
    });
  });
};

module.exports = { addData, getAllData, clearAllData };
