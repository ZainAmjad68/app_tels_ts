import express = require("express");
const telsRouter = express.Router();
import md = require("../../middleware/index");
import telsController from "../../controllers/tels";

telsRouter.get("/", telsController.init as unknown as express.RequestHandler);
telsRouter.get("/workorders", telsController.getWorkOrders as unknown as express.RequestHandler);
telsRouter.get(
  "/facility-workOrders-by-id",
  telsController.getFacilityWorkOrdersByID as unknown as express.RequestHandler
);
telsRouter.post("/create-workorder", telsController.createWorkOrder as unknown as express.RequestHandler);
telsRouter.post("/edit-workorder", telsController.editWorkOrder as unknown as express.RequestHandler);

export = telsRouter;
