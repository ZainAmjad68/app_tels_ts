"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config/index");
const app = require("./app");
const port = config.get("Port") || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}.`));
//      /api/tels/v1/
