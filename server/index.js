const cors = require("cors");
const express = require("express");
const orderBookController = require("./src/order-book/controller");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/order-book", orderBookController);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
