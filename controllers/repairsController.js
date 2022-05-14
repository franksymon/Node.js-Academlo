//Models
const { Repair } = require('../models/repairModel');
const { User } = require('../models/userModel');

//Utils
const { catchAsync } = require('../utils/catchAsync');

const getAllRepair = catchAsync(async (req, res, next) => {
  const query = req.query.new;

  const repairs = query
    ? await Repair.findAll({ where: { status: 'completed' } })
    : await Repair.findAll({
        where: { status: 'pending' },
        include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      });

  res.status(200).json({ repairs });
});

const createRepair = catchAsync(async (req, res, next) => {
  const { date, computerNumber, comments } = req.body;

  const { sessionUser } = req;

  const newRepair = await Repair.create({
    date,
    userId: sessionUser.id,
    computerNumber,
    comments,
  });

  res.status(201).json({ newRepair });
});

const getRepairId = catchAsync(async (req, res, next) => {
  const { repairData } = req;

  res.status(200).json({ repairData });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { repairData } = req;

  await repairData.update({ status: 'completed' });

  res.status(200).json({ status: 'success' });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { repairData } = req;

  await repairData.update({ status: 'cancelled' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllRepair,
  getRepairId,
  createRepair,
  updateRepair,
  deleteRepair,
};
