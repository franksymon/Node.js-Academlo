const express = require('express');

const router = express.Router();

//Middlewares
const { repairExists } = require('../middlewares/repairsMiddlewares');
const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/authMiddlewares');

//Controller
const {
  getAllRepair,
  getRepairId,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairsController');

router.post(
  '/',
  protectToken,
  createRepairValidations,
  checkValidations,
  createRepair
);

router.use(protectToken, protectAdmin);

router.get('/', getAllRepair);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepairId)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairsRouter: router };
