//Models
const { User } = require('../models/userModel');

//Utils
const { AppError } = require('../utils/appError');

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return next(new AppError('User does not exist with given Id', 404));

      // return res.status(404).json({
      //   status: 'erros',
      //   message: 'User not found given that id',
      // });
    }

    req.userData = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExists };
