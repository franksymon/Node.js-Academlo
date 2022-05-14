const { body, validationResult } = require('express-validator');

//Utils
const { AppError } = require('../utils/appError');

const createRepairValidations = [
  body('date').notEmpty().withMessage('Date cannot be empty'),
  body('computerNumber')
    .notEmpty()
    .withMessage('Computer Number cannot be empty'),
  body('comments').notEmpty().withMessage('Comments Number cannot be empty'),
];

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  //body('role').notEmpty().withMessage('Role cannot be empty'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map(error => {
      return error.msg;
    });

    const errorMsg = message.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

module.exports = {
  createRepairValidations,
  createUserValidations,
  checkValidations,
};
