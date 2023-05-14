const express = require('express');

const cities = require('./cities');
const states = require('./states');
const regions = require('./regions');

const router = express.Router();

router.use('/cities', cities);
router.use('/states', states);
router.use('/regions', regions);

module.exports = router;
