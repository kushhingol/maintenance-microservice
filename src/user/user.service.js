const jwt = require("jsonwebtoken");
const utilsService = require("../utils/utils");
const fileOperationUtils = require("../utils/file-operations");

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw utilsService.errorObject("NoCredentialFound");
  }
  
  if (email && password) {
    const userData = await fileOperationUtils.getFileData("user.json");
    const isValidCredentials = userData.some(
      (user) => user.email === email && user.password === password
    );
    if (isValidCredentials) {
      const token = jwt.sign({ sub: email }, process.env.SECRET_KEY, {
        expiresIn: 60 * process.env.TOKEN_EXPIRATION_TIME,
      });

      return {
        token,
        token_expiry_time: `${process.env.TOKEN_EXPIRATION_TIME} minutes`,
      };
    } else {
      throw utilsService.errorObject("InvalidCredentials");
    }
  }
};

module.exports = { login };
