import requestModule = require("./request");
import config = require("../config");
import urljoin = require("url-join");
import TELSurls = require("../data/TELS_urls");

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
  });
  return response.accessToken;
}

export = {
  refreshTELSAccessToken: refreshTELSAccessToken,
};
