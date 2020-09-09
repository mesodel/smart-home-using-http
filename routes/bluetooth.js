const express = require("express");
const router = express.Router();

const controller = require("../controller/bluetooth");

router.get("/search", controller.searchDevices);
router.post("/pair/:roomName", controller.pairSensor);
router.post("/reinit", controller.reinitSensor);

module.exports = router;
