const { Room } = require("../models/models");

const room = {
  create: async (room) => {
    try {
      let createdRoom = await Room.create(room);
      return createdRoom.id;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getAll: async () => {
    try {
      return await Room.findAll();
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = room;
