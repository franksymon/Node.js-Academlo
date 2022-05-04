const express = require('express');

const router = express.Router();

//Middlewares
const { repairExists } = require('../middlewares/repairsMiddlewares');
const {
  createRepairValidations,
  checkRepairValidations,
} = require('../middlewares/validationsRepairsMiddlewares');

//Controller
const {
  getAllPending,
  getRepairId,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairsController');

router
  .route('/')
  .get(getAllPending)
  .post(createRepairValidations, checkRepairValidations, createRepair);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepairId)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairsRouter: router };
