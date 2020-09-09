const roomService = require("../service/room");

const createRoom = async (req, res) => {
  try {
    let room = await roomService.create(req.body);
    res.status(201).json({
      message: "Room created successfully",
    });
  } catch (err) {
    res.status(404).json({
      err: "error",
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    let result = await roomService.getAll();

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      err: "error",
    });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
};
