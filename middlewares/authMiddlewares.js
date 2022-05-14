const jwt = require('jsonwebtoken');

//Models
const { User } = require('../models/userModel');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Session Invalid', 403));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('the owner of this token is no longer avilable', 403)
    );
  }

  req.sessionUser = user;

  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'employee') {
    return next(new AppError('Access not granted', 403));
  }

  next();
});

const protectAccountOwne = catchAsync(async (req, res, next) => {
  const { sessionUser, userData } = req;

  if (sessionUser.id !== userData.id) {
    return next(new AppError('You do not own this account', 403));
  }

  next();
});

module.exports = { protectToken, protectAdmin, protectAccountOwne };
