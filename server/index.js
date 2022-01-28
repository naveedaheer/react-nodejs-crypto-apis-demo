const express = require("express");
const app = express();
const cors = require("cors");
const orderBookController = require("./src/order-book/controller");
app.use(express.json());
app.use(cors());
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  ws.send("Welcome New Client!");
  setInterval(() => {
    const msg = {
      name: "test",
      message: "message",
    };
    ws.send(JSON.stringify(msg));
  }, 1000);
  ws.on("message", function incoming(message) {
    console.log("received123444", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.use("/order-book", orderBookController);
app.use(express.json());
app.use(cors());

server.listen(8000, () => console.log(`Lisening on port :8000`));
