/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const express = __webpack_require__(/*! express */ "express");
const awsServerlessExpressMiddleware = __webpack_require__(/*! aws-serverless-express/middleware */ "aws-serverless-express/middleware");
const helmet = __webpack_require__(/*! helmet */ "helmet");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const path = __webpack_require__(/*! path */ "path");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(helmet({ contentSecurityPolicy: false }));
const routes = __webpack_require__(/*! ./routes */ "./src/routes/index.ts");
app.use("/api", routes);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
module.exports = app;

/* WEBPACK VAR INJECTION */}.call(this, "src"))

/***/ }),

/***/ "./src/config/environments sync recursive ^\\.\\/.*\\.json$":
/*!*****************************************************!*\
  !*** ./src/config/environments sync ^\.\/.*\.json$ ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./development.json": "./src/config/environments/development.json",
	"./production.json": "./src/config/environments/production.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/config/environments sync recursive ^\\.\\/.*\\.json$";

/***/ }),

/***/ "./src/config/environments/development.json":
/*!**************************************************!*\
  !*** ./src/config/environments/development.json ***!
  \**************************************************/
/*! exports provided: environment, caremergeTELSid, Port, tels, app, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"environment\":\"development\",\"caremergeTELSid\":\"2605055\",\"Port\":8080,\"tels\":{\"baseUrl\":\"https://services.tels.net\",\"refreshToken\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRobWV0aG9kIjoiVHJ1c3QiLCJnaXZlbl9uYW1lIjoiQ2FyZW1lcmdlIiwiZmFtaWx5X25hbWUiOiJJbnRlZ3JhdGlvbiIsIkRTOkFjY291bnRJRCI6IjEyMDEyOTQiLCJEUzpVc2VyIjoiN2MwYzZmYzYtNzQyMS00MjVjLWIzYzktZWM1YzIyYzNjMWU1IiwiRFM6UGVyc29uSWQiOiIyNjA1MDU1IiwiRFM6UGVyc29uYSI6IjgiLCJEUzpSb2xlcyI6IjAiLCJEUzpGYWNpbGl0eUlEcyI6IjEzODI2NiIsImlzcyI6InNlcnZpY2VzLnRlbHMubmV0IiwiYXVkIjoic2VydmljZXMudGVscy5uZXQiLCJleHAiOjE2MTM2Njc0MzgsIm5iZiI6MTYxMzY2NzI1OH0.c5RgpI_7okku4-CvvAQGoRJv_sVOMx2CrAqP5muV8z8\",\"jwtSecret\":\"HelloWorld\"},\"app\":{\"table\":\"tels_workorders\"}}");

/***/ }),

/***/ "./src/config/environments/production.json":
/*!*************************************************!*\
  !*** ./src/config/environments/production.json ***!
  \*************************************************/
/*! exports provided: environment, caremergeTELSid, Port, tels, app, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"environment\":\"production\",\"caremergeTELSid\":\"2605055\",\"Port\":8080,\"tels\":{\"baseUrl\":\"https://services.tels.net\",\"refreshToken\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRobWV0aG9kIjoiVHJ1c3QiLCJnaXZlbl9uYW1lIjoiQ2FyZW1lcmdlIiwiZmFtaWx5X25hbWUiOiJJbnRlZ3JhdGlvbiIsIkRTOkFjY291bnRJRCI6IjEyMDEyOTQiLCJEUzpVc2VyIjoiN2MwYzZmYzYtNzQyMS00MjVjLWIzYzktZWM1YzIyYzNjMWU1IiwiRFM6UGVyc29uSWQiOiIyNjA1MDU1IiwiRFM6UGVyc29uYSI6IjgiLCJEUzpSb2xlcyI6IjAiLCJEUzpGYWNpbGl0eUlEcyI6IjEzODI2NiIsImlzcyI6InNlcnZpY2VzLnRlbHMubmV0IiwiYXVkIjoic2VydmljZXMudGVscy5uZXQiLCJleHAiOjE2MTM2Njc0MzgsIm5iZiI6MTYxMzY2NzI1OH0.c5RgpI_7okku4-CvvAQGoRJv_sVOMx2CrAqP5muV8z8\"},\"app\":{\"table\":\"tels_workorders\"}}");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const schema = __webpack_require__(/*! ./schema/schema */ "./src/config/schema/schema.ts");
var environmentConfig = __webpack_require__("./src/config/environments sync recursive ^\\.\\/.*\\.json$")("./" +
    schema.get("environment") +
    ".json");
schema.load(environmentConfig);
schema.validate({ allowed: "strict" });
module.exports = schema;


/***/ }),

/***/ "./src/config/schema/schema.ts":
/*!*************************************!*\
  !*** ./src/config/schema/schema.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const convict = __webpack_require__(/*! convict */ "convict");
module.exports = convict({
    environment: {
        doc: "Specifies the running environment of tels-integration-api",
        format: String,
        env: "NODE_ENV",
        default: "development",
    },
    caremergeTELSid: {
        doc: "Person ID given to Caremerge to use TEL's services.",
        format: String,
        default: "2605055",
    },
    Port: {
        doc: "Port to use for the server.",
        format: Number,
        default: 8080,
    },
    tels: {
        baseUrl: {
            doc: "TEL's environment url.",
            format: String,
            default: "https://services.tels.net",
        },
        refreshToken: {
            doc: "TEL's provided refresh token used to get access token",
            format: String,
            default: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRobWV0aG9kIjoiVHJ1c3QiLCJnaXZlbl9uYW1lIjoiQ2FyZW1lcmdlIiwiZmFtaWx5X25hbWUiOiJJbnRlZ3JhdGlvbiIsIkRTOkFjY291bnRJRCI6IjEyMDEyOTQiLCJEUzpVc2VyIjoiN2MwYzZmYzYtNzQyMS00MjVjLWIzYzktZWM1YzIyYzNjMWU1IiwiRFM6UGVyc29uSWQiOiIyNjA1MDU1IiwiRFM6UGVyc29uYSI6IjgiLCJEUzpSb2xlcyI6IjAiLCJEUzpGYWNpbGl0eUlEcyI6IjEzODI2NiIsImlzcyI6InNlcnZpY2VzLnRlbHMubmV0IiwiYXVkIjoic2VydmljZXMudGVscy5uZXQiLCJleHAiOjE2MTM2Njc0MzgsIm5iZiI6MTYxMzY2NzI1OH0.c5RgpI_7okku4-CvvAQGoRJv_sVOMx2CrAqP5muV8z8",
        },
        jwtSecret: {
            doc: "JWT secret to authenticate a call to TELS App",
            format: String,
            env: "JWT_SECRET",
            default: "HelloWorld",
        },
    },
    app: {
        table: {
            doc: "Tha name of the table that contains Resident -> WorkOrder mapping",
            format: String,
            default: "tels_workorders",
        },
        name: {
            doc: "Tha name of the integration app",
            format: String,
            default: "TELS Integration App",
        },
    },
});


/***/ }),

/***/ "./src/controllers/tels.ts":
/*!*********************************!*\
  !*** ./src/controllers/tels.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
const urljoin = __webpack_require__(/*! url-join */ "url-join");
const requestModule = __webpack_require__(/*! ../modules/request */ "./src/modules/request.ts");
const config = __webpack_require__(/*! ../config */ "./src/config/index.ts");
const tels_1 = __importDefault(__webpack_require__(/*! ../modules/tels */ "./src/modules/tels.ts"));
const TELS_constants_1 = __webpack_require__(/*! ../data/TELS_constants */ "./src/data/TELS_constants.ts");
const TELSurls = __webpack_require__(/*! ../data/TELS_urls */ "./src/data/TELS_urls.ts");
const errors_1 = __webpack_require__(/*! request-promise/errors */ "request-promise/errors");
const init = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { businessUnitId, residentId } = req;
            console.log("residentId", residentId);
            console.log("businessUnitId", businessUnitId);
            let workOrders;
            let DBresponse = yield tels_1.default.getWorkOrdersByResidentId(residentId);
            // won't reach here if the returned value is an error
            workOrders = DBresponse;
            req.log.info({ workOrders });
            let workOrderDetails = yield tels_1.default.getResidentWorkOrdersByID(businessUnitId, workOrders, req.accessToken);
            res.cookie("token", req.query.token, {
                maxAge: 1000 * 60 * 30,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
            res.removeHeader("X-Frame-Options");
            res.render("pages/index", {
                workOrderDetails,
                categories: TELS_constants_1.categories,
                priorities: TELS_constants_1.priorities,
                businessUnitId,
                residentId,
            });
        }
        catch (err) {
            req.log.info("Error: failed to load the Tels main endpoint");
            req.log.info({ err: err });
            if (err instanceof errors_1.StatusCodeError) {
                res.status(err.statusCode || 500).send(err.message);
            }
            else if (err instanceof Error) {
                res.send(err);
            }
        }
    });
};
const getWorkOrders = function (req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // req.query can't handle array query parameters as its not supported by aws-serverless-express, so getting the array parameters directly from event
            let workOrders = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.apiGateway) === null || _a === void 0 ? void 0 : _a.event) === null || _b === void 0 ? void 0 : _b.multiValueQueryStringParameters) === null || _c === void 0 ? void 0 : _c.workOrders;
            req.log.info({ workOrders }, "query WorkOrders");
            let workOrderDetails = yield Promise.all(_.map(workOrders, (workOrder) => __awaiter(this, void 0, void 0, function* () {
                return tels_1.default.getSingleWorkOrder(workOrder, req.accessToken);
            })));
            let responseStatus = 200;
            req.log.info(workOrderDetails);
            workOrderDetails.forEach((workOrder) => {
                if (workOrder instanceof errors_1.StatusCodeError) {
                    responseStatus = 422;
                }
            });
            return res.status(responseStatus).json(_.map(workOrderDetails, "value"));
        }
        catch (err) {
            req.log.info("Error: failed to get the work orders:");
            req.log.info({ err: err });
            if (err instanceof errors_1.StatusCodeError) {
                res.status(err.statusCode || 500).send(err.message);
            }
            else if (err instanceof Error) {
                res.send(err);
            }
        }
    });
};
const getFacilityWorkOrdersByID = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // the facility id of TELS is provided in the req.query here, currently there's only one but will be many more in future
            let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
            url = new URL(url);
            let searchParams = url.searchParams;
            for (var property in req.query) {
                searchParams.set(property, req.query[property]);
            }
            let response = yield requestModule.sendRequest({
                method: "GET",
                url: url,
                accessToken: req.accessToken,
            });
            while (response.nextPageKey) {
                searchParams.set("pageKey", response.nextPageKey);
                let nextPageData = yield requestModule.sendRequest({
                    method: "GET",
                    url: url,
                    accessToken: req.accessToken,
                });
                response.workOrders = [
                    ...response.workOrders,
                    ...nextPageData.workOrders,
                ];
                response.total = nextPageData.total;
                response.nextPageKey = nextPageData.nextPageKey;
            }
            req.log.info(response);
            if (_.isArray(response.workOrders)) {
                req.log.info("Details of all the Work Orders:", response.workOrders);
                req.log.info("Number of Work Orders in the Facility:", response.total);
            }
            let workOrderData = _.map(response.workOrders, (workOrder) => {
                return _.pick(workOrder, [
                    "authorizationNumber",
                    "title",
                    "description",
                    "whereLocated",
                    "createdWhen",
                ]);
            });
            res.status(200).json(workOrderData);
        }
        catch (err) {
            req.log.info("Error: failed to get work orders for entire facility using IDs");
            req.log.info({ err: err });
            if (err instanceof errors_1.StatusCodeError) {
                res.status(err.statusCode || 500).send(err.message);
            }
            else if (err instanceof Error) {
                res.send(err);
            }
        }
    });
};
const createWorkOrder = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // req.body has form data that is used to create the work order
            req.log.info("Create Work Order Request Body:", req.body);
            req.log.info("Create Work Order Request Query Parameters:", req.query);
            let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
            req.body.facilityId = req.businessUnitId;
            let response = yield tels_1.default.createWorkOrder(url, req.body, req.accessToken);
            if (response && response.stack && response.message) {
                throw response;
            }
            req.log.info("Work Order successfully created in TELS.");
            let workOrder = response.entityIdentifier;
            yield tels_1.default.putWorkOrderInDB(req.residentId, workOrder);
            res.status(200).json(response);
        }
        catch (err) {
            req.log.info("Error: failed to create the work order");
            req.log.info({ err: err });
            if (err instanceof errors_1.StatusCodeError) {
                res.status(err.statusCode || 500).send(err.message);
            }
            else if (err instanceof Error) {
                res.send(err);
            }
        }
    });
};
const editWorkOrder = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let workOrders = req.body;
            req.log.info({ body: req.body }, "Request Body:");
            const responseStatus = yield tels_1.default.editWorkOrder(workOrders, req.accessToken);
            if (responseStatus && responseStatus.stack && responseStatus.message) {
                throw responseStatus;
            }
            let backURL = req.header("Referer") || "/";
            res.redirect(responseStatus, backURL);
        }
        catch (err) {
            req.log.info("Error: failed to edit the work order");
            req.log.info({ err: err });
            if (err instanceof errors_1.StatusCodeError) {
                res.status(err.statusCode || 500).send(err.message);
            }
            else if (err instanceof Error) {
                res.send(err);
            }
        }
    });
};
exports.default = {
    init,
    getWorkOrders,
    getFacilityWorkOrdersByID,
    createWorkOrder,
    editWorkOrder,
};


/***/ }),

/***/ "./src/data/TELS_constants.ts":
/*!************************************!*\
  !*** ./src/data/TELS_constants.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.priorities = exports.statuses = exports.categories = void 0;
exports.categories = [
    {
        id: 17,
        name: "Administrative",
    },
    {
        id: 16,
        name: "Calibration",
    },
    {
        id: 6,
        name: "Cleaning",
    },
    {
        id: 12,
        name: "Drain Cleaning",
    },
    {
        id: 3,
        name: "Electrical",
    },
    {
        id: 7,
        name: "General Maintenance",
    },
    {
        id: 5,
        name: "Grounds Work",
    },
    {
        id: 10,
        name: "HVAC",
    },
    {
        id: 18,
        name: "IT Request",
    },
    {
        id: 13,
        name: "Kitchen Repair",
    },
    {
        id: 14,
        name: "Landscaping",
    },
    {
        id: 8,
        name: "Life Safety",
    },
    {
        id: 1,
        name: "Mechanical",
    },
    {
        id: 2,
        name: "Plumbing",
    },
    {
        id: 4,
        name: "Roof",
    },
    {
        id: 11,
        name: "Room Turn",
    },
    {
        id: 15,
        name: "Snow Removal",
    },
    {
        id: 9,
        name: "Vehicle Repair",
    },
], exports.statuses = [
    {
        name: "Open",
        value: 1,
    },
    {
        name: "In-Progress",
        value: 2,
    },
    {
        name: "Completed",
        value: 3,
    },
    {
        name: "Cancelled",
        value: 9,
    },
], exports.priorities = [
    {
        name: "Critical",
        value: 1,
    },
    {
        name: "High",
        value: 2,
    },
    {
        name: "Low",
        value: 4,
    },
    {
        name: "Medium",
        value: 3,
    },
];


/***/ }),

/***/ "./src/data/TELS_urls.ts":
/*!*******************************!*\
  !*** ./src/data/TELS_urls.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {
    facilityUrl: "customers/v1/contacts",
    workOrderUrl: "workOrders/v1/workOrders",
    OAuthUrl: "auth/token/refresh",
    workOrderCategories: "workOrders/v1/categories",
    workOrderPriorities: "workOrders/v1/priorities",
};


/***/ }),

/***/ "./src/middleware/index.ts":
/*!*********************************!*\
  !*** ./src/middleware/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.verifyJWTtoken = exports.attachTokenToRequest = exports.loadLogger = void 0;
const bunyan = __webpack_require__(/*! bunyan */ "bunyan");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const _ = __webpack_require__(/*! lodash */ "lodash");
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const config = __webpack_require__(/*! ../config */ "./src/config/index.ts");
const accessTokenModule = __webpack_require__(/*! ../modules/accessToken */ "./src/modules/accessToken.ts");
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
exports.loadLogger = loadLogger;
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
exports.verifyJWTtoken = verifyJWTtoken;
function attachTokenToRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accessToken) {
            accessToken = yield accessTokenModule.refreshTELSAccessToken();
        }
        req.accessToken = accessToken;
        next();
    });
}
exports.attachTokenToRequest = attachTokenToRequest;


/***/ }),

/***/ "./src/modules/accessToken.ts":
/*!************************************!*\
  !*** ./src/modules/accessToken.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
const requestModule = __webpack_require__(/*! ./request */ "./src/modules/request.ts");
const config = __webpack_require__(/*! ../config */ "./src/config/index.ts");
const urljoin = __webpack_require__(/*! url-join */ "url-join");
const TELSurls = __webpack_require__(/*! ../data/TELS_urls */ "./src/data/TELS_urls.ts");
function refreshTELSAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.OAuthUrl);
        let access_token = {
            refreshToken: config.get("tels").refreshToken,
        };
        // use something like express-session or node-cache to keep the data saved during a client's interaction and get from there instead of making a new request everytime
        let response = yield requestModule.sendRequest({
            method: "POST",
            url: url,
            data: access_token,
        });
        return response.accessToken;
    });
}
module.exports = {
    refreshTELSAccessToken: refreshTELSAccessToken,
};


/***/ }),

/***/ "./src/modules/request.ts":
/*!********************************!*\
  !*** ./src/modules/request.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
exports.sendRequest = exports.options = void 0;
const rp = __webpack_require__(/*! request-promise */ "request-promise");
const errors_1 = __webpack_require__(/*! request-promise/errors */ "request-promise/errors");
exports.options = {
    POST: { headers: true },
    GET: { gzip: true, headers: true },
    PATCH: {
        resolveWithFullResponse: true,
        headers: true,
    },
    SIMPLEPOST: {},
};
function sendRequest(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // options that are common for every request
            let httpOptions = {
                method: params.method,
                uri: params.url.toString(),
                json: true,
            };
            let attributes = exports.options[params.method];
            // append options that are different for each request type
            Object.assign(httpOptions, attributes);
            if (httpOptions["headers"] !== undefined) {
                httpOptions.headers = {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + params.accessToken,
                };
            }
            if (params.data !== undefined) {
                httpOptions.body = params.data;
            }
            return yield rp(httpOptions);
        }
        catch (err) {
            if (err instanceof errors_1.StatusCodeError) {
                // Not Authorized error, maybe refresh the user's auth token?
                if (err.statusCode === 401) {
                    err.message = "Refresh Token was rejected.";
                    return err;
                }
                else if (err.statusCode === 404) {
                    // Not Found, the server was unable to locate the resource
                    err.message = "Invalid Endpoint. Unable to Locate the Resource.";
                    return err;
                }
                else if (err.statusCode === 500) {
                    // Interal Server, something went wrong with the server itself!
                    err.message = "Internal Error. Server is Down.";
                    return err;
                }
            }
            else if (err instanceof errors_1.RequestError) {
                // something went wrong in the process of making the request
                // maybe the internet connection dropped
                err.message = "Unable to make the request. Check Internet Connection.";
            }
            return err;
        }
    });
}
exports.sendRequest = sendRequest;


/***/ }),

/***/ "./src/modules/tels.ts":
/*!*****************************!*\
  !*** ./src/modules/tels.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
const _ = __webpack_require__(/*! lodash */ "lodash");
const urljoin = __webpack_require__(/*! url-join */ "url-join");
const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");
const requestModule = __webpack_require__(/*! ../modules/request */ "./src/modules/request.ts");
const config = __webpack_require__(/*! ../config */ "./src/config/index.ts");
const TELS_constants_1 = __webpack_require__(/*! ../data/TELS_constants */ "./src/data/TELS_constants.ts");
const TELSurls = __webpack_require__(/*! ../data/TELS_urls */ "./src/data/TELS_urls.ts");
var docClient = new AWS.DynamoDB.DocumentClient();
const getSingleWorkOrder = function (workOrder, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
        url = `${url}/${workOrder}`;
        console.log("The URL of the Request:", url);
        let response;
        try {
            response = yield requestModule.sendRequest({
                method: "GET",
                url: url,
                accessToken: access_token,
            });
            if (response && response.stack && response.message) {
                throw response;
            }
        }
        catch (err) {
            throw err;
        }
        let relevantData = _.pick(response, [
            "authorizationNumber",
            "title",
            "description",
            "createdWhen",
            "whereLocated",
            "status",
            "priority",
            "category",
        ]);
        const findStatus = TELS_constants_1.statuses.find((status) => status.value === relevantData.status);
        relevantData.status = findStatus === null || findStatus === void 0 ? void 0 : findStatus.name;
        return relevantData;
        /*}*/
    });
};
const getWorkOrderCategories = function (access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderCategories);
        console.log("The URL of the Request:", url);
        let response = yield requestModule.sendRequest({
            method: "GET",
            url: url,
            accessToken: access_token,
        });
        return response;
    });
};
const getWorkOrdersByResidentId = function (residentId) {
    return __awaiter(this, void 0, void 0, function* () {
        let workOrders;
        var params = {
            TableName: config.get("app").table,
            ExpressionAttributeValues: {
                ":residentId": residentId,
            },
            ExpressionAttributeNames: {
                "#residentId": "residentId",
            },
            KeyConditionExpression: "#residentId = :residentId",
            ScanIndexForward: false, // to sort the results returned in Descending Order
        };
        try {
            const awsRequest = yield docClient.query(params);
            const result = yield awsRequest.promise();
            console.log("Result fetched from AWS:", result);
            workOrders = _.map(result.Items, "workOrder");
        }
        catch (err) {
            console.log("Query to Database Failed.");
            console.log(err);
            throw err;
        }
        return workOrders;
    });
};
const putWorkOrderInDB = function (residentId, workOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("residentId to put in DB:", residentId);
        console.log("workOrder to put in DB:", workOrder);
        var params = {
            TableName: config.get("app").table,
            Item: {
                residentId: residentId,
                workOrder: workOrder,
            },
        };
        try {
            console.log("Adding a new item...");
            const awsRequest = yield docClient.put(params);
            yield awsRequest.promise();
            console.log("WorkOrder Data added to DynamoDB Successfully.");
        }
        catch (err) {
            console.log("Unable to Add Data into DynamoDB.");
            throw err;
        }
    });
};
const getTELSfacilityId = function (facilityName, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.facilityUrl, config.get("caremergeTELSid"), "facilities");
        console.log("The URL of the Request:", url);
        let response = yield requestModule.sendRequest({
            method: "GET",
            url: url,
            accessToken: access_token,
        });
        let userFacility = _.find(response, (facility) => {
            return facility.name === facilityName;
        });
        return userFacility.businessUnitId;
    });
};
function getAllFacilities(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.facilityUrl);
        url = `${url}/${config.get("caremergeTELSid")}/facilities`;
        let response = yield requestModule.sendRequest({
            method: "GET",
            url: url,
            accessToken: accessToken,
        });
        console.log(response);
        if (_.isArray(response)) {
            return response;
        }
    });
}
const getUserFacility = function (facilityName, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        let allFacilities = yield getAllFacilities(accessToken);
        let userFacility = _.find(allFacilities, (facility) => {
            return facility.name === facilityName;
        });
        return userFacility.businessUnitId;
    });
};
const editWorkOrder = function (workOrder, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
        url = `${url}/${workOrder.authorizationNumber}`;
        console.log(url);
        delete workOrder.authorizationNumber;
        let data = [];
        for (var params of Object.keys(workOrder)) {
            data.push({
                value: workOrder[params],
                path: params,
                op: "replace",
            });
        }
        try {
            let response = yield requestModule.sendRequest({
                method: "PATCH",
                url: url,
                accessToken: access_token,
                data: data,
            });
            return response.statusCode;
        }
        catch (err) {
            return err;
        }
    });
};
const createWorkOrder = function (url, data, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield requestModule.sendRequest({
            method: "POST",
            url: url,
            accessToken: accessToken,
            data: data,
        });
        return response;
    });
};
const getResidentWorkOrdersByID = function (businessUnitId, workOrderIds, accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("workOrderIds", workOrderIds);
        let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
        url = new URL(url);
        let searchParams = url.searchParams;
        searchParams.set("businessUnitId", businessUnitId);
        let response = yield requestModule.sendRequest({
            method: "GET",
            url: url,
            accessToken: accessToken,
        });
        while (response.nextPageKey) {
            searchParams.set("pageKey", response.nextPageKey);
            let nextPageData = yield requestModule.sendRequest({
                method: "GET",
                url: url,
                accessToken: accessToken,
            });
            response.workOrders = [...response.workOrders, ...nextPageData.workOrders];
            response.nextPageKey = nextPageData.nextPageKey;
        }
        if (response && response.stack && response.message) {
            throw response;
        }
        const workOrderDetails = _.map(workOrderIds, (id) => _.find(response.workOrders, (workOrder) => workOrder.authorizationNumber === id));
        console.log("workOrderDetails", workOrderDetails);
        workOrderDetails.forEach(
        // to convert the status id into name that the user can understand
        (workOrder) => {
            var _a;
            return (workOrder.status = (_a = _.find(TELS_constants_1.statuses, (status) => status.value === workOrder.status)) === null || _a === void 0 ? void 0 : _a.name);
        });
        return workOrderDetails;
    });
};
exports.default = {
    getSingleWorkOrder,
    getWorkOrderCategories,
    getWorkOrdersByResidentId,
    putWorkOrderInDB,
    getTELSfacilityId,
    getUserFacility,
    editWorkOrder,
    createWorkOrder,
    getResidentWorkOrdersByID,
};


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const router = express_1.default.Router();
const telsRouter = __webpack_require__(/*! ./tels/tels.router */ "./src/routes/tels/tels.router.ts");
const md = __webpack_require__(/*! ../middleware/index */ "./src/middleware/index.ts");
// TELS specific middlewares
router.use(md.loadLogger);
router.use(md.verifyJWTtoken);
router.use(md.attachTokenToRequest);
router.use("/tels/v1", telsRouter);
module.exports = router;


/***/ }),

/***/ "./src/routes/tels/tels.router.ts":
/*!****************************************!*\
  !*** ./src/routes/tels/tels.router.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = __webpack_require__(/*! express */ "express");
const telsRouter = express.Router();
const tels_1 = __importDefault(__webpack_require__(/*! ../../controllers/tels */ "./src/controllers/tels.ts"));
telsRouter.get("/", tels_1.default.init);
telsRouter.get("/workorders", tels_1.default.getWorkOrders);
telsRouter.get("/facility-workOrders-by-id", tels_1.default.getFacilityWorkOrdersByID);
telsRouter.post("/create-workorder", tels_1.default.createWorkOrder);
telsRouter.post("/edit-workorder", tels_1.default.editWorkOrder);
module.exports = telsRouter;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config = __webpack_require__(/*! ./config/index */ "./src/config/index.ts");
const app = __webpack_require__(/*! ./app */ "./src/app.ts");
const port = config.get("Port") || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}.`));
//      /api/tels/v1/


/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "aws-serverless-express/middleware":
/*!****************************************************!*\
  !*** external "aws-serverless-express/middleware" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-serverless-express/middleware");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "bunyan":
/*!*************************!*\
  !*** external "bunyan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),

/***/ "convict":
/*!**************************!*\
  !*** external "convict" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("convict");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),

/***/ "request-promise/errors":
/*!*****************************************!*\
  !*** external "request-promise/errors" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise/errors");

/***/ }),

/***/ "url-join":
/*!***************************!*\
  !*** external "url-join" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-join");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map