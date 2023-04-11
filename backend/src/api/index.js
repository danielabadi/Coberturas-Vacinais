const express = require('express');

const cities = require('./cities');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/cities', cities);

module.exports = router;
