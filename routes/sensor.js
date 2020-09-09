const express = require("express");
const router = express.Router();

const controller = require("../controller/sensor");

router.post("/create", controller.createSensor);

router.get("/getAll", controller.getAllSensors);
router.get("/getSensorsByRoom/:roomId", controller.getSensorsByRoom);

module.exports = router;
