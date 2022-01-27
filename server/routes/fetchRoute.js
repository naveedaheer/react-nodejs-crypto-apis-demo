const express = require("express");
const { fetchController } = require("../Controller/fetchController");
const router = express.Router();

router.route("/").get(fetchController)


module.exports = router