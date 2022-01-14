const express = require("express");
const telsRouter = express.Router();
const md = require("../../middleware/index");
const telsController = require("../../controllers/tels");

telsRouter.get("/", telsController.init);
telsRouter.get("/workorders", telsController.getWorkOrders);
telsRouter.get(
  "/facility-workOrders-by-id",
  telsController.getFacilityWorkOrdersByID
);
telsRouter.post("/create-workorder", telsController.createWorkOrder);
telsRouter.post("/edit-workorder", telsController.editWorkOrder);

module.exports = telsRouter;
