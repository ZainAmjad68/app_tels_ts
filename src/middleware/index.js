const bunyan = require("bunyan");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");

const accessTokenModule = require("../modules/accessToken");

let accessToken;

function loadLogger(req, res, next) {
  req.log = bunyan.createLogger({
    name: "tels-logger",
    req_id: _.has(req.headers, "X-Amzn-Trace-Id")
      ? req.headers["X-Amzn-Trace-Id"]
      : uuidv4(),
    serializers: { err: bunyan.stdSerializers.err },
  });
  next();
}

function verifyJWTtoken(req, res, next) {
  try {
    let token = req.query.token
      ? req.query.token
      : req.cookies.token
      ? req.cookies.token
      : res
          .status(401)
          .send(
            "No Access Token Provided or Cookies Expired. Authentication Failed."
          );
    req.log.info("JWT Token: ", token);
    var tokenClaims = jwt.verify(token, config.get("tels").jwtSecret);
    req.log.info("JWT Token Payload/Claims after Verification: ", tokenClaims);
    req.residentId = tokenClaims.userId;
    req.businessUnitId = tokenClaims.businessUnitId;
    next();
  } catch (err) {
    req.log.info(`Error:${err}`);
    res.status(401).send("Access Token Provided is Invalid.");
  }
}

async function attachTokenToRequest(req, res, next) {
  if (!accessToken) {
    accessToken = await accessTokenModule.refreshTELSAccessToken();
  }
  req.accessToken = accessToken;
  next();
}

module.exports = {
  loadLogger: loadLogger,
  attachTokenToRequest: attachTokenToRequest,
  verifyJWTtoken: verifyJWTtoken,
};
