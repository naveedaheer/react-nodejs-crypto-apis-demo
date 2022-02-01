const express = require("express");
const app = express();
const cors = require("cors");
const orderBookController = require("./src/order-book/controller");
app.use(cors())
app.options('*', cors());

app.use("/order-book", orderBookController);

app.get('/', (req, res) => res.send('Server Up and Running'))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Lisening on port ${PORT}`));