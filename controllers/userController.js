//Models
const { User } = require('../models/userModel');

//Utils
const { catchAsync } = require('../utils/catchAsync');

const getAlluser = catchAsync(async (req, res) => {
  const users = await User.findAll();

  res.status(200).json({ users });
});

const createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({ name, email, password, role });

  res.status(201).json({ newUser });
});

const getUserId = catchAsync(async (req, res) => {
  const { userData } = req;

  res.status(200).json({ userData });
});

const updateUser = catchAsync(async (req, res) => {
  const { userData } = req;

  const { name, email } = req.body;

  await userData.update({ name, email });

  res.status(201).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userData } = req;

  await userData.update({ status: 'disabled' });

  res.status(201).json({ status: 'success' });
});

module.exports = {
  getAlluser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
};
