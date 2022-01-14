"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rp = require("request-promise");
const errors_1 = require("request-promise/errors");
let options = {
    POST: { headers: true },
    GET: { gzip: true, headers: true },
    PATCH: {
        resolveWithFullResponse: true,
        headers: true,
    },
    SIMPLEPOST: {},
};
function sendRequest(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // options that are common for every request
            let httpOptions = {
                method: params.method,
                uri: params.url,
                json: true,
            };
            let attributes = options[params.method];
            // append options that are different for each request type
            Object.assign(httpOptions, attributes);
            if (httpOptions["headers"] !== undefined) {
                httpOptions.headers = {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + params.accessToken,
                };
            }
            if (params.data !== undefined) {
                httpOptions.body = params.data;
            }
            return yield rp(httpOptions);
        }
        catch (err) {
            if (err instanceof errors_1.StatusCodeError) {
                // Not Authorized error, maybe refresh the user's auth token?
                if (err.statusCode === 401) {
                    err.message = "Refresh Token was rejected.";
                    return err;
                }
                else if (err.statusCode === 404) {
                    // Not Found, the server was unable to locate the resource
                    err.message = "Invalid Endpoint. Unable to Locate the Resource.";
                    return err;
                }
                else if (err.statusCode === 500) {
                    // Interal Server, something went wrong with the server itself!
                    err.message = "Internal Error. Server is Down.";
                    return err;
                }
            }
            else if (err instanceof errors_1.RequestError) {
                // something went wrong in the process of making the request
                // maybe the internet connection dropped
                err.message = "Unable to make the request. Check Internet Connection.";
            }
            return err;
        }
    });
}
module.exports = {
    sendRequest: sendRequest,
};
