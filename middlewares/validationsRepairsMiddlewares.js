const { body, validationResult } = require('express-validator');

const createRepairValidations = [
  body('date').notEmpty().withMessage('Date cannot be empty'),
  body('userId').notEmpty().withMessage('UserId cannot be empty'),
  body('computerNumber')
    .notEmpty()
    .withMessage('Computer Number cannot be empty'),
  body('comments').notEmpty().withMessage('Comments Number cannot be empty'),
];

const checkRepairValidations = (req, res, next) => {
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

module.exports = { createRepairValidations, checkRepairValidations };
