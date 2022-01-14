"use strict";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import awsServerlessExpress = require("aws-serverless-express");
import app = require("./app");
const binaryMimeTypes = ["*/*"];
const server = awsServerlessExpress.createServer(app, () => null, binaryMimeTypes);
exports.handler = (event: APIGatewayProxyEvent, context: Context) =>
  awsServerlessExpress.proxy(server, event, context);
