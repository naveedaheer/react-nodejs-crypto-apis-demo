const express = require("express");
const router = express.Router();
const orderBookService = require("./services");

router.get("/fetch-order-books", (req, res) => {
  orderBookService
    .getOrderBooks(req.query)
    .then(async (data) => {
      await res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
