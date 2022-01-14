import bunyan = require("bunyan");
import { v4 } from "uuid";
import _ = require("lodash");
import jwt = require("jsonwebtoken");
import config = require("../config");
import { Request, Response, NextFunction } from 'express';
import accessTokenModule = require("../modules/accessToken");
import Logger = require("bunyan");

let accessToken: string;

declare module "express" { 
  export interface Request {
    log: Logger,
    residentId : string,
    businessUnitId : string,
    accessToken: string,
  }
}

function loadLogger(req: Request, res: Response, next: NextFunction) {
  req.log = bunyan.createLogger({
    name: "tels-logger",
    req_id: _.has(req.headers, "X-Amzn-Trace-Id")
      ? req.headers["X-Amzn-Trace-Id"]
      : v4(),
    serializers: { err: bunyan.stdSerializers.err },
  });
  next();
}

function verifyJWTtoken(req: Request, res: Response, next: NextFunction) {
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

async function attachTokenToRequest(req: Request, res: Response, next: NextFunction) {
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
