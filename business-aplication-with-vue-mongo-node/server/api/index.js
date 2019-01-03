const express = require("express");
const router = express.Router();

require("./routes/transaction")(router);
require("./routes/user").default(router);

module.exports = router;
