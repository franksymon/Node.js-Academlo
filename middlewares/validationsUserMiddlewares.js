const { body, validationResult } = require('express-validator');

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
  body('role').notEmpty(),
];

const checkUserValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map(error => {
      return error.msg;
    });

    const errorMsg = message.join('. ');

    return res.status(400).json({ status: 'error', message: errorMsg });
  }

  next();
};

module.exports = { createUserValidations, checkUserValidations };
