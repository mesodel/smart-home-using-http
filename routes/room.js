const express = require("express");
const router = express.Router();

const controller = require("../controller/room");

router.post("/create", controller.createRoom);
router.get("/getAll", controller.getAllRooms);

module.exports = router;
