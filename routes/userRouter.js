const express = require('express');

const router = express.Router();

//Middlewares
const { userExists } = require('../middlewares/usersMiddlewares');

//Controllers
const {
  getAlluser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').get(getAlluser).post(createUser);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserId)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };
