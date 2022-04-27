const { User } = require('../models/userModel');

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: 'erros',
        message: 'User not found given that id',
      });
    }

    req.userData = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExists };
