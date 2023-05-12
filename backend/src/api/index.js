const express = require('express');

const cities = require('./cities');
const states = require('./states');

const router = express.Router();

router.use('/cities', cities);
router.use('/states', states);

module.exports = router;
