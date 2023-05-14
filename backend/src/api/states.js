const express = require('express');
const db = require('../db');
//const knexPostgis = require('knex-postgis');
//const st = knexPostgis(db);

const router = express.Router();

// router.get('/teste', (req,res) => {
//     db.select(
//         st.asGeoJSON('geom')
//     ).from('municipio')
//     .then((data) => {
//         res.json(data);
//         //console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })


router.get('/cobertura_mapa', (req, res) => {
    db.select('cod_ibge', 'estado_uf', 'vacina_id', 'ano', 'cobertura', 'doses')
        .where('vacina_id', req.query.vaccine)
        .where('ano', req.query.year)
        .orderBy('cod_ibge')
        .table('estado_vacina')
        .then(data => {
            const dictionary = data.reduce((dictionary, dado) => {
                dictionary[dado.cod_ibge] = dado;
                return dictionary;
            }, {});
            res.json(dictionary);
        }).catch(err => {
            console.log(err);
        });
});

router.get('/cobertura', (req, res) => {
    db.select('estado_uf', 'vacina_id', 'ano', 'cobertura')
        .where('vacina_id', req.query.vaccine)
        .orderBy('ano')
        .table('estado_vacina')
        .then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        });
});

router.get('/info', (req, res) => {
    db.select({
        cod_ibge: 'cod_ibge',
        uf: 'estado.uf',
        pop_urbana_2010: 'porc_pop_urbana_2010',
        area: 'area_total',
        qtd_municipios: 'qtd_municipios',
        idhm: 'idhm',
        idhm_renda: 'idhm_renda',
        idhm_long: 'idhm_longevidade',
        idhm_edu: 'idhm_educacao',
        quantidade_estabelecimentos: 'quantidade_estabelecimentos'
    })
        .where('cod_ibge', req.query.state)
        .table('estado')
        .leftJoin('estado_idhm', 'cod_ibge', 'estado_idhm.estado_cod_ibge')
        .leftJoin('estado_estabelecimentos_sus', 'cod_ibge', 'estado_estabelecimentos_sus.estado_cod_ibge')
        .then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;
