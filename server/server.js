const express = require("express");
const cors = require("cors");
const app = express();
const orderBookController = require("./src/order-book/controller");
const orderBookService = require("./src/order-book/services");
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

app.use(cors());
app.options("*", cors());
app.use("/order-book", orderBookController);

let selectedPair;
app.get("/order-book/fetch-order-books", (req, res) => {
  selectedPair = req.query;
  orderBookService
    .getOrderBooks(req.query)
    .then(async (data) => {
      res.status(200).send(data);
    })
});
wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  setInterval(() => {
    if (selectedPair) {
      orderBookService.getOrderBooks(selectedPair).then(async (data) => {
        //  res.status(200).send(data);
        ws.send(JSON.stringify(data));
      });
    }
  }, 10000);
  wss.on("message", function incoming(message) {
    console.log("received1234445", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Lisening on port ${PORT}`));
