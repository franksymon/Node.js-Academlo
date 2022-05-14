const express = require('express');

const router = express.Router();

//Middlewares
const { userExists } = require('../middlewares/usersMiddlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');
const {
  protectToken,
  protectAdmin,
  protectAccountOwne,
} = require('../middlewares/authMiddlewares');

//Controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/userController');

// Endpoints

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', login);

router.use(protectToken);

router.get('/', protectAdmin, getAllUsers);

router
  //.use('/:id', userExists)
  .route('/:id')
  .get(protectAdmin, userExists, getUserById)
  .patch(protectAccountOwne, userExists, updateUser)
  .delete(protectAccountOwne, userExists, deleteUser);

module.exports = { usersRouter: router };
