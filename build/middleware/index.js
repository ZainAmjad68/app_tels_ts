"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const uuid_1 = require("uuid");
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
            : (0, uuid_1.v4)(),
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
                    .send("No Access Token Provided or Cookies Expired. Authentication Failed.");
        req.log.info("JWT Token: ", token);
        var tokenClaims = jwt.verify(token, config.get("tels").jwtSecret);
        req.log.info("JWT Token Payload/Claims after Verification: ", tokenClaims);
        req.residentId = tokenClaims.userId;
        req.businessUnitId = tokenClaims.businessUnitId;
        next();
    }
    catch (err) {
        req.log.info(`Error:${err}`);
        res.status(401).send("Access Token Provided is Invalid.");
    }
}
function attachTokenToRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accessToken) {
            accessToken = yield accessTokenModule.refreshTELSAccessToken();
        }
        req.accessToken = accessToken;
        next();
    });
}
module.exports = {
    loadLogger: loadLogger,
    attachTokenToRequest: attachTokenToRequest,
    verifyJWTtoken: verifyJWTtoken,
};
