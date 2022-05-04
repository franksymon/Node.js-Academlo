const express = require('express');

const router = express.Router();

//Middlewares
const { userExists } = require('../middlewares/usersMiddlewares');
const {
  createUserValidations,
  checkUserValidations,
} = require('../middlewares/validationsUserMiddlewares');

//Controllers
const {
  getAlluser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router
  .route('/')
  .get(getAlluser)
  .post(createUserValidations, checkUserValidations, createUser);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserId)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { usersRouter: router };
