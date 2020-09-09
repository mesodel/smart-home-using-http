const bluetoothSerialPort = require("../modules/bluetoothSerialPort");
const recordService = require("../service/record");
const sensorService = require("../service/sensor");
const roomService = require("../service/room");
let { search, pairDevice } = require("../modules/bluetoothBluez");

const searchDevices = async (req, res) => {
  try {
    let deviceList = await search();

    res.status(200).json(deviceList);
  } catch (err) {
    res.status(404).json({
      err: err.message,
    });
  }
};

let getOrCreateRoom = async (roomName) => {
  let roomIndex = -1;
  roomList = await roomService.getAll();
  for (let i = 0; i < roomList.length; i++) {
    if (typeof roomList[i].name !== "string")
      roomList[i].name = String(roomList[i].name);
    if (roomList[i].name.toLowerCase() === roomName.toLowerCase()) {
      roomIndex = i + 1;
      return roomIndex;
    }
  }
  if (roomIndex == -1) {
    let roomId = await roomService.create({ name: roomName });
    return roomId;
  }
};

const pairSensor = async (req, res) => {
  try {
    let sensor = req.body;
    let roomName = req.params.roomName;
    console.log(roomName);
    let roomId = await getOrCreateRoom(roomName);
    try {
      console.log("step 1 reached");
      await pairDevice(sensor.address);
      console.log("step 2 reached");
      await sensorService.create(sensor, roomId);
      console.log("sensor created");

      setInterval(async () => {
        console.log("executing interval");
        let record = await bluetoothSerialPort.retrieveDataFromSensor(
          sensor.address,
          sensor.type
        );
        console.log(record);
        if (record.temperature) {
          await recordService.create(
            { value: record.temperature },
            sensor.address,
            "temperature"
          );
        }
        if (record.humidity) {
          await recordService.create(
            { value: record.humidity },
            sensor.address,
            "humidity"
          );
        }
      }, 60000);

      res.status(200).json({
        message: "OK",
      });
    } catch (err) {
      throw err;
    }
  } catch (err) {
    res.status(404).json({
      err: err.message,
    });
  }
};

const reinitSensor = async (req, res) => {
  try {
    let pairedSensors = await sensorService.getAll();
    for (let i = 0; i < pairedSensors.length; i++) {
      let sensor = pairedSensors[i];
      await pairDevice(sensor.address);
      setInterval(async () => {
        console.log("executing interval");
        let record = await bluetoothSerialPort.retrieveDataFromSensor(
          sensor.address,
          sensor.type
        );
        console.log(record);
        if (record.temperature) {
          await recordService.create(
            { value: record.temperature },
            sensor.address,
            "temperature"
          );
        }
        if (record.humidity) {
          await recordService.create(
            { value: record.humidity },
            sensor.address,
            "humidity"
          );
        }
      }, 60000);
    }
    res.status(200).json({
      message: "OK",
    });
  } catch (err) {
    res.status(404).json({
      err: err.message,
    });
  }
};

module.exports = {
  searchDevices,
  pairSensor,
  reinitSensor,
};
