const getSQLQueries = () => {
  return {
    addMaintenance: `INSERT INTO maintenance set ?`,
    findAllMaintenanceData: `SELECT name, start_date, start_time, end_date, end_time from maintenance WHERE is_deleted = 0 ORDER BY id desc`,
    deleteAllMaintenanceData: `UPDATE maintenance SET is_deleted = 1 WHERE is_deleted = 0`,
  };
};


module.exports = getSQLQueries