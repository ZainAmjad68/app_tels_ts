"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const binaryMimeTypes = ["*/*"];
const server = awsServerlessExpress.createServer(app, () => null, binaryMimeTypes);
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
