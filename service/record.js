const { Record } = require("../models/models");
const { Op } = require("sequelize");

const record = {
  create: async (sentRecord, sensorAddress, type) => {
    try {
      let record = Record.build(sentRecord);
      record.sensorAddress = sensorAddress;
      record.type = type;
      record.date = new Date(Date.now() + 3 * 60 * 60 * 1000);
      await record.save();

      return record;
    } catch (err) {
      console.log(err);
    }
  },
  getAllSensorValues: async (address) => {
    try {
      const sensorValues = await Record.findAll({
        where: { sensorAddress: address },
      });

      return sensorValues;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },
  getSensorValuesForToday: async (address) => {
    try {
      let currDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
      let dateWithoutHour = new Date(
        Date.now() +
          3 * 60 * 60 * 1000 -
          currDate.getUTCHours() * 60 * 60 * 1000 -
          currDate.getMinutes() * 60 * 1000 -
          currDate.getSeconds() * 1000
      );
      const sensorValues = await Record.findAll({
        where: {
          sensorAddress: address,
          date: {
            [Op.gt]: dateWithoutHour,
          },
        },
      });

      return sensorValues;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },
};

module.exports = record;
