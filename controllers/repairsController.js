const { Repair } = require('../models/repairModel');

const getAllPending = async (req, res) => {
  try {
    const repairs = await Repair.findAll({ where: { status: 'pending' } });

    res.status(200).json({ repairs });
  } catch (error) {
    console.log(error);
  }
};

const createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newRepair = await Repair.create({ date, userId });

    res.status(201).json({ newRepair });
  } catch (error) {
    console.log(error);
  }
};

const getRepairId = async (req, res) => {
  try {
    const { repairData } = req;

    res.status(200).json({ repairData });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { repairData } = req;

    await repairData.update({ status: 'completed' });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { repairData } = req;

    await repairData.update({ status: 'cancelled' });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPending,
  getRepairId,
  createRepair,
  updateRepair,
  deleteRepair,
};
