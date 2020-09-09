const sensorService = require("../service/sensor");

const createSensor = async (req, res) => {
  try {
    const sensor = req.body.sensor;
    const roomId = req.body.roomId;

    let result = await sensorService.create(sensor, roomId);

    res.status(201).json({
      message: "Sensor created successfully",
    });
  } catch (err) {
    res.status(404).json({
      err: err.message,
    });
  }
};

const getAllSensors = async (req, res) => {
  try {
    const result = await sensorService.getAll();

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      err: "error",
    });
  }
};

const getSensorsByRoom = async (req, res) => {
  try {
    const result = await sensorService.getByRoom(req.params.roomId);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      err: "error",
    });
  }
};

module.exports = {
  createSensor,
  getAllSensors,
  getSensorsByRoom,
};
