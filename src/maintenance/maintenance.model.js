const dbConn = require("../db/db");
const queries = require("./maintenance.sql");

const allQueries = queries();

const Maintenance = function (maintenance) {
  this.name = maintenance.name;
  this.start_date = maintenance.start_date;
  this.start_time = maintenance.start_time;
  this.end_date = maintenance.end_date;
  this.end_time = maintenance.end_time;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Maintenance.create = function (newMaintenance, result) {
  dbConn.query(allQueries.addMaintenance, newMaintenance, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Maintenance.findAll = function (result) {
  dbConn.query(
    allQueries.findAllMaintenanceData,
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Maintenance.deleteAll = function (result) {
  dbConn.query(
    allQueries.deleteAllMaintenanceData,
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = Maintenance;
