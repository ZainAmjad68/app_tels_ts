import express = require("express");
import awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
import helmet = require("helmet");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(helmet({contentSecurityPolicy: false}));

const routes = require("./routes");
app.use("/api", routes);

app.set( "views", path.join( __dirname, "views" ) );
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));

//module.exports = app;
export = app;
