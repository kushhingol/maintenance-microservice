"use strict";
const fs = require("fs");
const utilsService = require("./utils");

/**
 * @desc: Function is defined to get the fileData
 * @param {*} fileName : String
 * @returns : Object
 */
const getFileData = async (fileName) => {
  try {
    const rawdata = await fs.readFileSync(`src/data-source/${fileName}`);
    return JSON.parse(rawdata);
  } catch (e) {
    console.log('errpr', e)
    throw utilsService.errorObject("FileOperationError");
  }
};

/**
 * @desc: Function is defined to write data into the file
 * @param {*} fileName : String
 * @param {*} fileData : Object
 * @returns Object {success: boolean}
 */
const writeFileData = async (fileName, fileData) => {
  try {
    const data = JSON.stringify(fileData);
    await fs.writeFileSync(`src/data-source/${fileName}`, data);
    return {
      success: true,
    };
  } catch (e) {
    throw utilsService.errorObject("FileOperationError");
  }
};

module.exports = {getFileData, writeFileData}
