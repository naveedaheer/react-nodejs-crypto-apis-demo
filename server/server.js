const express = require("express");
const app = express();
const cors = require("cors");
const orderBookController = require("./src/order-book/controller");
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

app.use(cors())
app.options('*', cors());

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  ws.send("Welcome New Client!");
  setInterval(() => {
    // const msg = {
    //   name: "test",
    //   message: "message",
    // };
    // ws.send(JSON.stringify(msg));
  }, 1000);
  ws.on("message", function incoming(message) {
    console.log("received1234445", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.use("/order-book", orderBookController);

app.get('/', (req, res) => res.send('Server Up and Running'))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Lisening on port ${PORT}`));
module.exports = wss;