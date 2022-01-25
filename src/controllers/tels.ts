import _ = require("lodash");
import urljoin = require("url-join");

import { Request, Response } from 'express';

import requestModule = require("../modules/request");
import config = require("../config");
import TELS from "../modules/tels";
import { categories, priorities } from "../data/TELS_constants";
import TELSurls = require("../data/TELS_urls");
import { StatusCodeError } from "request-promise/errors";

import { workOrder, workOrderOptional } from "../types";

const init = async function (req : Request, res : Response) {
  try {
    let { businessUnitId, residentId } = req;

    console.log("residentId", residentId);
    console.log("businessUnitId", businessUnitId);
    let workOrders;

    let DBresponse = await TELS.getWorkOrdersByResidentId(residentId);

    // won't reach here if the returned value is an error
    workOrders = DBresponse;
    req.log.info({ workOrders });
    let workOrderDetails = await TELS.getResidentWorkOrdersByID(
      businessUnitId,
      workOrders,
      req.accessToken
    );
    res.cookie("token", req.query.token, {
      maxAge: 1000*60*30,  // 30 min
      httpOnly: true,
      sameSite: 'none',  // otherwise it doesn't send the cookie when opened in iframe
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
  } catch (err) {
    req.log.info("Error: failed to load the Tels main endpoint");
    req.log.info({ err: err });
    if (err instanceof StatusCodeError) {
      res.status(err.statusCode || 500).send(err.message);
      } else if (err instanceof Error) {
        res.send(err);
      }
  }
};

const getWorkOrders = async function (req : Request, res : Response) {
  try {
    // req.query can't handle array query parameters as its not supported by aws-serverless-express, so getting the array parameters directly from event
    let workOrders =
      req?.apiGateway?.event?.multiValueQueryStringParameters?.workOrders;
    req.log.info({ workOrders }, "query WorkOrders");
    let workOrderDetails : workOrder[] = await Promise.all(
      _.map(workOrders, async (workOrder) => {
        return TELS.getSingleWorkOrder(workOrder, req.accessToken);
      })
    );
    let responseStatus = 200;
    req.log.info(workOrderDetails);
    workOrderDetails.forEach((workOrder) => {
      if (workOrder instanceof StatusCodeError) {
        responseStatus = 422;
      }
    });
    return res.status(responseStatus).json(_.map(workOrderDetails, "value"));
  } catch (err) {
    req.log.info("Error: failed to get the work orders:");
    req.log.info({ err: err });
    if (err instanceof StatusCodeError) {
      res.status(err.statusCode || 500).send(err.message);
      } else if (err instanceof Error) {
        res.send(err);
      }
  }
};

const getFacilityWorkOrdersByID = async function (req : Request, res : Response) {
  try {
    // the facility id of TELS is provided in the req.query here, currently there's only one but will be many more in future
    let url : string | URL = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
    url = new URL(url);
    let searchParams = url.searchParams;
    for (var property in req.query) {
      searchParams.set(property, req.query[property] as string);
    }
    let response = await requestModule.sendRequest({
      method: "GET",
      url: url,
      accessToken: req.accessToken,
    });
    while (response.nextPageKey) {
      searchParams.set("pageKey", response.nextPageKey);
      let nextPageData = await requestModule.sendRequest({
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
  } catch (err) {
    req.log.info(
      "Error: failed to get work orders for entire facility using IDs"
    );
    req.log.info({ err: err });
    if (err instanceof StatusCodeError) {
      res.status(err.statusCode || 500).send(err.message);
      } else if (err instanceof Error) {
        res.send(err);
      }
  }
};

const createWorkOrder = async function (req : Request, res : Response) {
  try {
    // req.body has form data that is used to create the work order
    req.log.info("Create Work Order Request Body:", req.body);
    req.log.info("Create Work Order Request Query Parameters:", req.query);
    let url = urljoin(config.get("tels").baseUrl, TELSurls.workOrderUrl);
    req.body.facilityId = req.businessUnitId;
    let response = await TELS.createWorkOrder(url, req.body, req.accessToken);
    if (response && response.stack && response.message) {
      throw response;
    }
    req.log.info("Work Order successfully created in TELS.");
    let workOrder = response.entityIdentifier;
    await TELS.putWorkOrderInDB(req.residentId, workOrder);
    res.status(200).json(response);
  } catch (err) {
    req.log.info("Error: failed to create the work order");
    req.log.info({ err: err });
    if (err instanceof StatusCodeError) {
      res.status(err.statusCode || 500).send(err.message);
      } else if (err instanceof Error) {
        res.send(err);
      }
  }
};

const editWorkOrder = async function (req : Request, res : Response) {
  try {
    let workOrders : workOrderOptional = req.body;
    req.log.info({ body: req.body }, "Request Body:");
    const responseStatus = await TELS.editWorkOrder(
      workOrders,
      req.accessToken
    );
    if (responseStatus && responseStatus.stack && responseStatus.message) {
      throw responseStatus;
    }
    let backURL = req.header("Referer") || "/";
    res.redirect(responseStatus, backURL);
  } catch (err) {
    req.log.info("Error: failed to edit the work order");
    req.log.info({ err: err });
    if (err instanceof StatusCodeError) {
    res.status(err.statusCode || 500).send(err.message);
    } else if (err instanceof Error) {
      res.send(err);
    }
  }
};


export default {
  init,
  getWorkOrders,
  getFacilityWorkOrdersByID,
  createWorkOrder,
  editWorkOrder,
}