//Models
const { Repair } = require('../models/repairModel');

//Utils
const { AppError } = require('../utils/appError');

const repairExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id, status: 'pending' } });

    if (!repair) {
      return next(new AppError('No repair found with the given id', 404));

      // return res.status(404).json({
      //   status: 'error',
      //   message: 'spare part not available',
      // });
    }

    req.repairData = repair;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { repairExists };
