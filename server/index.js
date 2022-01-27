const cors = require('cors');
const express = require("express")
const fetchRouter = require("./routes/fetchRoute")
const PORT = 8000;


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/fetch", fetchRouter)


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})