const express = require("express");
const router = express.Router();
const utilsService = require("../utils/utils");
const userService = require("./user.service");

/**
 * @desc: Function is defined to login a user based on user and password
 * @param {*} req : Object (request Object)
 * @param {*} res : Object (response Object)
 * @param {*} next : Function
 */
const login = (req, res, next) => {
  userService
    .login(req.body)
    .then((user) =>
      user
        ? res.json(
            utilsService.responseHandler({
              res,
              status: "success",
              responseBody: user,
              responseMessage: "",
            })
          )
        : (function () {
            throw utilsService.errorObject("InvalidCredentials");
          })()
    )
    .catch((err) => next(err));
};

router.post("/login", login);

module.exports = router;
