const express = require('express');
const db = require('../db')

const router = express.Router();

router.get('/cobertura', (req, res) => {
  db.select('regiao', 'vacina_id', 'ano', 'cobertura', 'doses')
    .where('vacina_id', req.query.vaccine)
    .orderBy('ano')
    .table('regiao_vacina')
    .then(data => {
      res.json(data);
    }).catch(err => {
      console.log(err);
    });
});

module.exports = router;