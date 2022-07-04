const jwt  = require('jsonwebtoken')
const utilsService = require("../utils/utils");


/**
 * @desc: Function is defined to verify the JWT token
 * @param {*} req : Object (request object)
 * @param {*} res : Object (response object)
 * @param {*} next : Function
 */
 const verifyJWT = (req,res,next) => {
	const token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null;
	if(!token) {
		throw utilsService.errorObject("UnauthorizedError");
	}
	try {
		const decoded = jwt.verify(token,process.env.SECRET_KEY);
		decoded ? next() : (function(){throw utilsService.errorObject("UnauthorizedError")}());
	} catch(e) {
		throw utilsService.errorObject("UnauthorizedError");
	}
}


module.exports = verifyJWT;