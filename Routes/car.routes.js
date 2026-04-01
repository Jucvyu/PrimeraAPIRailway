const express = require('express');
const router = express.Router();

const { createCar, getCar } = require('../Controllers/car.controller');

router.get('/', getCar);
router.post('/', createCar);

module.exports = router;