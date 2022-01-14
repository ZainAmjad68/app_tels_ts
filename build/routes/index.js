"use strict";
const express = require("express");
const router = express.Router();
const tels = require("./tels/tels.router");
const md = require("../middleware/index");
// TELS specific middlewares
router.use(md.loadLogger);
router.use(md.verifyJWTtoken);
router.use(md.attachTokenToRequest);
router.use("/tels/v1", tels);
module.exports = router;
