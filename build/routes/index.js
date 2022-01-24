"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const telsRouter = require("./tels/tels.router");
const md = require("../middleware/index");
// TELS specific middlewares
router.use(md.loadLogger);
router.use(md.verifyJWTtoken);
router.use(md.attachTokenToRequest);
router.use("/tels/v1", telsRouter);
module.exports = router;
