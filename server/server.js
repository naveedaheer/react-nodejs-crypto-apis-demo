const express = require("express");
const app = express();
const cors = require("cors");
const cron = require('node-cron');
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

app.use(cors());
app.options("*", cors());

const orderBookController = require("./src/order-book/controller");
const orderBookService = require("./src/order-book/services");

let selectedPair;

app.use("/order-book", orderBookController);
app.get("/order-book/fetch-order-books", (req, res) => {
  selectedPair = req.query;
  orderBookService
    .getOrderBooks(req.query)
    .then(async (data) => {
      res.status(200).send(data);
    })
});

wss.on("connection", function connection(ws) {
  /**
   * Fetching latest data every 5 seconds 
   */
  cron.schedule('*/5 * * * * *', () => {
    if (selectedPair) {
      orderBookService.getOrderBooks(selectedPair).then((data) => {
        ws.send(JSON.stringify(data));
      });
    }
  });
});

app.get('/', (req, res) => res.send('Server Up and Running'))

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Lisening on port ${PORT}`));
