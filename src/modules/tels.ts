import _ = require("lodash");
import urljoin = require("url-join");
import AWS = require("aws-sdk");

import requestModule = require("../modules/request");
import config = require("../config");
import {statuses} from "../data/TELS_constants";
import TELSurls = require("../data/TELS_urls");

import { workOrder, workOrderOptional } from "../types";

var docClient = new AWS.DynamoDB.DocumentClient();

const getSingleWorkOrder = async function (workOrder : string, access_token : string) : Promise<workOrder> {
  let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
  url = `${url}/${workOrder}`;
  console.log("The URL of the Request:", url);
  let response;
  try {
    response = await requestModule.sendRequest({
      method: "GET",
      url: url,
      accessToken: access_token,
    });
    if (response && response.stack && response.message) {
      throw response;
    }
  } catch (err) {
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
  const findStatus = statuses.find(
    (status) => status.value === relevantData.status
  );
  relevantData.status = findStatus?.name;
  return relevantData;
  /*}*/
};

const getWorkOrderCategories = async function (access_token : string) {
  let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderCategories);
  console.log("The URL of the Request:", url);
  let response = await requestModule.sendRequest({
    method: "GET",
    url: url,
    accessToken: access_token,
  });
  return response;
};

const getWorkOrdersByResidentId = async function (residentId : string) : Promise<string[]> {
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
    const awsRequest = await docClient.query(params);
    const result = await awsRequest.promise();
    console.log("Result fetched from AWS:", result);
    workOrders = _.map(result.Items, "workOrder");
  } catch (err) {
    console.log("Query to Database Failed.");
    console.log(err);
    throw err;
  }
  return workOrders;
};

const putWorkOrderInDB = async function (residentId : string, workOrder : string) {
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
    const awsRequest = await docClient.put(params);
    await awsRequest.promise();
    console.log("WorkOrder Data added to DynamoDB Successfully.");
  } catch (err) {
    console.log("Unable to Add Data into DynamoDB.");
    throw err;
  }
};

const getTELSfacilityId = async function (facilityName : string, access_token : string) {
  let url = urljoin(
    config.get("tels").baseUrl,
    TELSurls.facilityUrl,
    config.get("caremergeTELSid"),
    "facilities"
  );
  console.log("The URL of the Request:", url);
  let response = await requestModule.sendRequest({
    method: "GET",
    url: url,
    accessToken: access_token,
  });
  let userFacility = _.find(response, (facility) => {
    return facility.name === facilityName;
  });
  return userFacility.businessUnitId;
};

async function getAllFacilities(accessToken : string) {
  let url = urljoin(config.get("tels").baseUrl, TELSurls.facilityUrl);

  url = `${url}/${config.get("caremergeTELSid")}/facilities`;
  let response = await requestModule.sendRequest({
    method: "GET",
    url: url,
    accessToken: accessToken,
  });

  console.log(response);
  if (_.isArray(response)) {
    return response;
  }
}

const getUserFacility = async function (facilityName : string, accessToken : string) {
  let allFacilities = await getAllFacilities(accessToken);
  let userFacility = _.find(allFacilities, (facility) => {
    return facility.name === facilityName;
  });
  return userFacility.businessUnitId;
};

const editWorkOrder = async function (workOrder : workOrderOptional , access_token : string) { // need to change the any type
  let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
  url = `${url}/${workOrder.authorizationNumber}`;
  console.log(url);
  delete workOrder.authorizationNumber;

  let data = [];
  for (var params of Object.keys(workOrder)) {
    data.push({
      value: workOrder[params as keyof workOrderOptional],
      path: params,
      op: "replace",
    });
  }
  try {
    let response = await requestModule.sendRequest({
      method: "PATCH",
      url: url,
      accessToken: access_token,
      data: data,
    });
    return response.statusCode;
  } catch (err) {
    return err;
  }
};

const createWorkOrder = async function (url : string, data : FormData, accessToken : string) {
  let response = await requestModule.sendRequest({
    method: "POST",
    url: url,
    accessToken: accessToken,
    data: data,
  });
  return response;
};

const getResidentWorkOrdersByID = async function (
  businessUnitId : string,
  workOrderIds : string[],
  accessToken : string
) : Promise<object[]> {
  console.log("workOrderIds", workOrderIds);
  let url : string | URL = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
  url = new URL(url);
  let searchParams = url.searchParams;
  searchParams.set("businessUnitId", businessUnitId);
  let response = await requestModule.sendRequest({
    method: "GET",
    url: url,
    accessToken: accessToken,
  });
  while (response.nextPageKey) {
    searchParams.set("pageKey", response.nextPageKey);
    let nextPageData = await requestModule.sendRequest({
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
  const workOrderDetails = _.map(workOrderIds, (id) =>
    _.find(
      response.workOrders,
      (workOrder) => workOrder.authorizationNumber === id
    )
  );
  console.log("workOrderDetails", workOrderDetails);
  workOrderDetails.forEach(
    // to convert the status id into name that the user can understand
    (workOrder) =>
      (workOrder.status = _.find(
        statuses,
        (status) => status.value === workOrder.status
      )?.name)
  );
  return workOrderDetails;
};

export default {
  getSingleWorkOrder,
  getWorkOrderCategories,
  getWorkOrdersByResidentId,
  putWorkOrderInDB,
  getTELSfacilityId,
  getUserFacility,
  editWorkOrder,
  createWorkOrder,
  getResidentWorkOrdersByID,
}