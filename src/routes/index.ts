import express, {RequestHandler} from "express";
const router = express.Router();
import telsRouter = require("./tels/tels.router");
import md = require("../middleware/index");

// TELS specific middlewares
router.use(md.loadLogger as RequestHandler);
router.use(md.verifyJWTtoken as RequestHandler);
router.use(md.attachTokenToRequest as unknown as RequestHandler);

router.use("/tels/v1", telsRouter);

export = router;
