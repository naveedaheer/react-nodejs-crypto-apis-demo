const express = require("express");
const app = express();
const server = require("http").createServer(app);
const router = express.Router();
const orderBookService = require("./services");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

router.get("/fetch-order-books", (req, res) => {
  orderBookService
    .getOrderBooks(req.query)
    .then(async (data) => {
      // wss.on("connection", function connection(ws) {
      //   console.log("A new client Connected!");
      //   ws.send("Welcome New Client!");
      //   setInterval(() => {
      //     // const msg = {
      //     //   name: "test",
      //     //   message: "message",
      //     // };
      //     // ws.send(JSON.stringify(msg));
      //   }, 1000);
      //   wss.on("message", function incoming(message) {
      //     console.log("received1234445", message);
      
      //     wss.clients.forEach(function each(client) {
      //       if (client !== ws && client.readyState === WebSocket.OPEN) {
      //         client.send(message);
      //       }
      //     });
      //   });
      // });
      await res.status(200).send(data);
      // await res.status(200).send(wss.send(JSON.stringify(data)));
    })
    .catch((err) => res.status(400).send(err));
});

router.get("/get-currency-pairs", (req, res) => {
  orderBookService
    .currencyPairs()
    .then(async (data) => {
      await res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
