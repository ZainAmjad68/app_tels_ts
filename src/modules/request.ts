import rp = require("request-promise");
import { RequestError, StatusCodeError } from "request-promise/errors";

let options = {
  POST: { headers: true },
  GET: { gzip: true, headers: true },
  PATCH: {
    resolveWithFullResponse: true,
    headers: true,
  },
  SIMPLEPOST: {},
};

interface httpOpt {
  method: "POST" | "GET" | "PATCH" | "SIMPLEPOST",
  uri: string,
  json: boolean,
  headers?: object,
  body?: string | object
}

interface paramInterface {
  method: keyof typeof options,
  url:string,
  accessToken?: string,
  data?: string | object
}

async function sendRequest(params : paramInterface) {
  try {
    // options that are common for every request
    let httpOptions : httpOpt = {
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
    return await rp(httpOptions);
  } catch (err) {
      if (err instanceof StatusCodeError) {
        // Not Authorized error, maybe refresh the user's auth token?
        if (err.statusCode === 401) {
          err.message = "Refresh Token was rejected.";
          return err;
        } else if (err.statusCode === 404) {
          // Not Found, the server was unable to locate the resource
          err.message = "Invalid Endpoint. Unable to Locate the Resource.";
          return err;
        } else if (err.statusCode === 500) {
          // Interal Server, something went wrong with the server itself!
          err.message = "Internal Error. Server is Down.";
          return err;
        }
      } else if (err instanceof RequestError) {
        // something went wrong in the process of making the request
        // maybe the internet connection dropped
        err.message = "Unable to make the request. Check Internet Connection.";
      }
      return err;
    
  }
}

export = {
  sendRequest: sendRequest,
};
