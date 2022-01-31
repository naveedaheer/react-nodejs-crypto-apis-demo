const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const orderBookController = require("./src/order-book/controller");
app.use(cors())
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

app.use("/order-book", orderBookController);

app.get('/', (req, res) => res.send('Server Up and Running'))

const PORT = 8000;
app.listen(PORT, () => console.log(`Lisening on port ${PORT}`));