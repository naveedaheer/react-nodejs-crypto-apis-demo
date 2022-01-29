require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const orderBookController = require("./src/order-book/controller");

app.use(express.json());
app.use(cors());
app.use("/order-book", orderBookController);

app.get('/', (req, res) => res.send('Server Up and Running'))

// const PORT = 8000;
const server = app.listen(process.env.PORT || 8000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });
// app.listen(PORT, () => console.log(`Lisening on port ${PORT}`));
