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
const _ = require("lodash");
const urljoin = require("url-join");
const requestModule = require("../modules/request");
const config = require("../config");
const TELS = require("../modules/tels");
const { categories, priorities } = require("../data/TELS_constants");
const TELSurls = require("../data/TELS_urls");
exports.init = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let businessUnitId, residentId;
            if (req.businessUnitId && req.residentId) {
                ({ businessUnitId, residentId } = req);
            }
            else {
                businessUnitId = "138266";
                residentId = "1234";
            }
            console.log("residentId", residentId);
            console.log("businessUnitId", businessUnitId);
            let workOrders;
            let DBresponse = yield TELS.getWorkOrdersByResidentId(residentId);
            if (DBresponse && DBresponse.stack && DBresponse.message) {
                throw DBresponse;
            }
            // won't reach here if the returned value is an error
            workOrders = DBresponse;
            req.log.info({ workOrders });
            let workOrderDetails = yield TELS.getResidentWorkOrdersByID(businessUnitId, workOrders, req.accessToken);
            if (workOrderDetails &&
                workOrderDetails.stack &&
                workOrderDetails.message) {
                throw workOrderDetails;
            }
            res.cookie("token", req.query.token, {
                maxAge: 1000 * 60 * 30,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
            res.removeHeader("X-Frame-Options");
            res.render("pages/index", {
                workOrderDetails,
                categories,
                priorities,
                businessUnitId,
                residentId,
            });
        }
        catch (err) {
            req.log.info("Error: failed to load the Tels main endpoint");
            req.log.info({ err: err });
            res.status(err.statusCode || 500).send(err.message);
        }
    });
};
exports.getWorkOrders = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // req.query can't handle array query parameters as its not supported by aws-serverless-express, so getting the array parameters directly from event
            let workOrders = req.apiGateway.event.multiValueQueryStringParameters.workOrders;
            req.log.info({ workOrders }, "query WorkOrders");
            let workOrderDetails = yield Promise.all(_.map(workOrders, (workOrder) => __awaiter(this, void 0, void 0, function* () {
                return TELS.getSingleWorkOrder(workOrder, req.accessToken);
            })));
            let responseStatus = 200;
            req.log.info(workOrderDetails);
            workOrderDetails.forEach((workOrder) => {
                if (workOrder &&
                    workOrder.stack &&
                    workOrder.message &&
                    workOrder.statusCode === 404) {
                    responseStatus = 422;
                }
            });
            return res.status(responseStatus).json(_.map(workOrderDetails, "value"));
        }
        catch (err) {
            req.log.info("Error: failed to get the work orders:");
            req.log.info({ err: err });
            res.status(err.statusCode).send(err.message);
        }
    });
};
exports.getFacilityWorkOrdersByID = function (req, res) {
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
            res.status(err.statusCode).send(err.message);
        }
    });
};
exports.createWorkOrder = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // req.body has form data that is used to create the work order
            req.log.info("Create Work Order Request Body:", req.body);
            req.log.info("Create Work Order Request Query Parameters:", req.query);
            let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
            req.body.facilityId = req.businessUnitId;
            let response = yield TELS.createWorkOrder(url, req.body, req.accessToken);
            if (response && response.stack && response.message) {
                throw response;
            }
            req.log.info("Work Order successfully created in TELS.");
            let workOrder = response.entityIdentifier;
            yield TELS.putWorkOrderInDB(req.residentId, workOrder);
            res.status(200).json(response);
        }
        catch (err) {
            req.log.info("Error: failed to create the work order");
            req.log.info({ err: err });
            res.status(err.statusCode || 500).send(err.message);
        }
    });
};
exports.editWorkOrder = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let workOrders = req.body;
            req.log.info({ body: req.body }, "Request Body:");
            const responseStatus = yield TELS.editWorkOrder(workOrders, req.accessToken);
            if (responseStatus && responseStatus.stack && responseStatus.message) {
                throw responseStatus;
            }
            let backURL = req.header("Referer") || "/";
            res.redirect(responseStatus, backURL);
        }
        catch (err) {
            req.log.info("Error: failed to edit the work order");
            req.log.info({ err: err });
            res.status(err.statusCode || 500).send(err.message);
        }
    });
};
