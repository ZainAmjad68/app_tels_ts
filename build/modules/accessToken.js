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
const requestModule = require("./request");
const config = require("../config");
const urljoin = require("url-join");
const TELSurls = require("../data/TELS_urls");
function refreshTELSAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = urljoin(config.get("tels").baseUrl, TELSurls.OAuthUrl);
        let access_token = {
            refreshToken: config.get("tels").refreshToken,
        };
        // use something like express-session or node-cache to keep the data saved during a client's interaction and get from there instead of making a new request everytime
        let response = yield requestModule.sendRequest({
            method: "POST",
            url: url,
            data: access_token,
        });
        return response.accessToken;
    });
}
module.exports = {
    refreshTELSAccessToken: refreshTELSAccessToken,
};
