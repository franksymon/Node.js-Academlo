//Models
const { Repair } = require('../models/repairModel');
const { User } = require('../models/userModel');

//Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllPending = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User }],
  });

  res.status(200).json({ repairs });
});

const createRepair = catchAsync(async (req, res) => {
  const { date, userId, computerNumber, comments } = req.body;

  const newRepair = await Repair.create({
    date,
    userId,
    computerNumber,
    comments,
  });

  res.status(201).json({ newRepair });
});

const getRepairId = catchAsync(async (req, res) => {
  const { repairData } = req;

  res.status(200).json({ repairData });
});

const updateRepair = catchAsync(async (req, res) => {
  const { repairData } = req;

  await repairData.update({ status: 'completed' });

  res.status(200).json({ status: 'success' });
});

const deleteRepair = catchAsync(async (req, res) => {
  const { repairData } = req;

  await repairData.update({ status: 'cancelled' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllPending,
  getRepairId,
  createRepair,
  updateRepair,
  deleteRepair,
};
