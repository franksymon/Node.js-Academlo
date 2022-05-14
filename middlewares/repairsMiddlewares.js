//Models
const { Repair } = require('../models/repairModel');

//Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const repairExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });

  if (!repair) {
    return next(new AppError('No repair found with the given id', 404));
  }

  req.repairData = repair;

  next();
});

module.exports = { repairExists };
