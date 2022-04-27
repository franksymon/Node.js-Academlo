const { User } = require('../models/userModel');

const getAlluser = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({ name, email, password, role });

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const getUserId = async (req, res) => {
  try {
    const { userData } = req;

    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userData } = req;

    const { name, email } = req.body;

    await userData.update({ name, email });

    res.status(201).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userData } = req;

    await userData.update({ status: 'disabled' });

    res.status(201).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAlluser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
};
