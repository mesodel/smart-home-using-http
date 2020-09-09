const recordService = require("../service/record");

const createRecord = async (req, res) => {
  try {
    console.log(req.body);
    let record = req.body.record;
    let sensorAddress = req.body.sensorAddress;
    let type = req.body.type;

    await recordService.create(record, sensorAddress, type);

    res.status(201).json({
      message: "record created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      err: "error",
    });
  }
};

const getAllRecords = async (req, res) => {
  try {
    let address = req.params.address;
    let records = await recordService.getAllSensorValues(address);

    res.status(200).json(records);
  } catch (err) {
    res.status(404).json({
      err: "error",
    });
  }
};

const getRecordsForToday = async (req, res) => {
  try {
    let address = req.params.address;
    let records = await recordService.getSensorValuesForToday(address);

    res.status(200).json(records);
  } catch (err) {
    res.status(404).json({
      err: "error",
    });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordsForToday,
};
