const requestModule = require("./request");
const config = require("../config");
const urljoin = require("url-join");
const TELSurls = require("../data/TELS_urls");
const { method } = require("lodash");

async function refreshTELSAccessToken() {
  let url = urljoin(config.get("tels").baseUrl, TELSurls.OAuthUrl);
  let access_token = {
    refreshToken: config.get("tels").refreshToken,
  };
  // use something like express-session or node-cache to keep the data saved during a client's interaction and get from there instead of making a new request everytime
  let response = await requestModule.sendRequest({
    method: "POST",
    url: url,
    data: access_token,
    accessToken: access_token.refreshToken,
  });
  return response.accessToken;
}

module.exports = {
  refreshTELSAccessToken: refreshTELSAccessToken,
};
