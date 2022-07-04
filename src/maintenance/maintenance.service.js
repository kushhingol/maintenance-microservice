const utilsService = require("../utils/utils");
const fileOperationUtils = require("../utils/file-operations");

/**
 * @desc: Function is defined to add the maintenance timelines
 * @param {*} maintenanceData : Object {name, startDate, endDate, endTime}
 * @returns  Promise<{success: boolean; data: {name, startDate, endDate, endTime}>
 */
const addData = async (maintenanceData) => {
    const {name, startDate, startTime, endDate, endTime} = maintenanceData;
    const isValidData = name && startDate && startTime && endDate && endTime;
    if(isValidData) {
        const maintenanceDataFromFile = await fileOperationUtils.getFileData('maintenance-datasource.json');
        const addedNewRecord = [...JSON.parse(JSON.stringify(maintenanceDataFromFile)), maintenanceData];
        const {success} = await fileOperationUtils.writeFileData('maintenance-datasource.json', addedNewRecord);
        if(success) {
            return {
                success: true,
                data: maintenanceData
            }
        } else {
            throw utilsService.errorObject("FileOperationError");
        }
        
    } else {
        throw utilsService.errorObject("FileOperationError");
    }
}

/**
 * @desc: Function is defined to get all maintenance data from the json data store
 * @returns Promise<{name, startDate, endDate, endTime}[]>
 */
const getAllData = () => {
    const maintenanceDataFromFile = fileOperationUtils.getFileData('maintenance-datasource.json');
    return maintenanceDataFromFile
}

/**
 * @desc: Function is defined to clear all mainteance data from the json data store
 * @returns Promise<{success: boolean}>
 */
const clearAllData = async () => {
    return fileOperationUtils.writeFileData('maintenance-datasource.json', []);
}

module.exports = {addData, getAllData, clearAllData}