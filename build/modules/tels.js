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
const _ = require("lodash");
const urljoin = require("url-join");
const AWS = require("aws-sdk");
const requestModule = require("../modules/request");
const config = require("../config");
const TELS_constants_1 = require("../data/TELS_constants");
const TELSurls = require("../data/TELS_urls");
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
