const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const roomRouter = require("./routes/room");
const sensorRouter = require("./routes/sensor");
const recordRouter = require("./routes/record");
const bluetoothRouter = require("./routes/bluetooth");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/room", roomRouter);
app.use("/sensor", sensorRouter);
app.use("/record", recordRouter);
app.use("/bluetooth", bluetoothRouter);

app.listen(3001, () => {
  console.log("server started on port 3001");
});
