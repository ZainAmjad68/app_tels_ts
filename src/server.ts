import config = require("./config/index");
import app = require("./app");

const port = config.get("Port") || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}.`));

//      /api/tels/v1/
