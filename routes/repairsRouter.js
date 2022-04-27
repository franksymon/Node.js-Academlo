const express = require('express');

const router = express.Router();

//Middlewares
const { repairExists } = require('../middlewares/repairsMiddlewares');

//Controller
const {
  getAllPending,
  getRepairId,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairsController');

router.route('/').get(getAllPending).post(createRepair);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepairId)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairsRouter: router };
