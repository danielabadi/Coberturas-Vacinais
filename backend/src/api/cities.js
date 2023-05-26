const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/cobertura', (req, res) => {
  db.select('municipio_cod_ibge', 'cobertura', 'ano', 'nome')
    .where('municipio_cod_ibge', req.query.city)
    .orderBy('ano')
    .table('municipio_vacina')
    .leftJoin('vacina', 'vacina_id', 'id_vacina')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/info', (req, res) => {
  db.select({
    cod_ibge: 'cod_ibge',
    municipio: 'nome',
    pop_urbana_2010: 'porcentagem_pop_urbana_2010',
    densidade_2010: 'densidade_demografica_2010',
    area: 'area_km2',
    idhm: 'idhm',
    idhm_renda: 'idhm_renda',
    idhm_long: 'idhm_longevidade',
    idhm_edu: 'idhm_educacao',
    quantidade_estabelecimentos: 'quantidade_estabelecimentos',
  })
    .where('cod_ibge', req.query.city)
    .table('municipio')
    .leftJoin('idhm', 'cod_ibge', 'municipio_cod_ibge')
    .leftJoin('estabelecimentos_sus', 'cod_ibge', 'estabelecimentos_sus.municipio_cod_ibge')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/populacao', (req, res) => {
  db.select({
    cod_ibge: 'municipio_cod_ibge',
    ano: 'ano',
    populacao: 'pop',
  })
    .where('municipio_cod_ibge', req.query.city)
    .orderBy('ano')
    .table('pop_municipio')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/pib', (req, res) => {
  db.select({
    cod_ibge: 'municipio_cod_ibge',
    ano: 'ano',
    pib: 'pib',
    pib_per_capita: 'pib_per_capita',
  })
    .where('municipio_cod_ibge', req.query.city)
    .orderBy('ano')
    .table('pib')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/cobertura_mapa', (req, res) => {
  db.select('municipio_cod_ibge', 'cobertura', 'doses')
      .where('vacina_id', req.query.vaccine)
      .where('ano', req.query.year)
      .table('municipio_vacina')
      .then(data => {
          const dictionary = data.reduce((dictionary, dado) => {
              dictionary[dado.municipio_cod_ibge] = dado;
              return dictionary;
          }, {});
          res.json(dictionary);
      }).catch(err => {
          console.log(err);
      });
});

module.exports = router;
