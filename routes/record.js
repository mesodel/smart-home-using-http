const express = require("express");
const router = express.Router();

const controller = require("../controller/record");

router.post("/create", controller.createRecord);

router.get("/getAll/:address", controller.getAllRecords);
router.get("/getForToday/:address", controller.getRecordsForToday);

module.exports = router;
