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
const _ = require("lodash");
const urljoin = require("url-join");
const requestModule = require("../modules/request");
const config = require("../config");
const tels_1 = __importDefault(require("../modules/tels"));
const TELS_constants_1 = require("../data/TELS_constants");
const TELSurls = require("../data/TELS_urls");
const errors_1 = require("request-promise/errors");
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
