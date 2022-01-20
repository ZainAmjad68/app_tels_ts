"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express = require("express");
const telsRouter = express.Router();
const tels_1 = __importDefault(require("../../controllers/tels"));
telsRouter.get("/", tels_1.default.init);
telsRouter.get("/workorders", tels_1.default.getWorkOrders);
telsRouter.get("/facility-workOrders-by-id", tels_1.default.getFacilityWorkOrdersByID);
telsRouter.post("/create-workorder", tels_1.default.createWorkOrder);
telsRouter.post("/edit-workorder", tels_1.default.editWorkOrder);
module.exports = telsRouter;
