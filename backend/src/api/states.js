const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/map_coverage', async (req, res) => {
    try {
        const data = await db('estado_vacina')
            .select({
                cod_ibge: 'estado_cod_ibge',
                estado_uf: 'estado_uf',
                vacina_id: 'vacina_id',
                ano: 'ano',
                cobertura: 'cobertura',
                doses: 'doses'
            })
            .where('vacina_id', req.query.vaccine)
            .where('ano', req.query.year)
            .orderBy('cod_ibge');

        if (data.length === 0) {
            console.log('No data found');
            return res.status(404).json([]);
        }

        const dictionary = data.reduce((dict, item) => {
            dict[item.cod_ibge] = item;
            return dict;
        }, {});

        return res.json(dictionary);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get('/info', async (req, res) => {
    try {
        const data = await db('estado')
            .select({
                cod_ibge: 'cod_ibge',
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
            .leftJoin('estado_idhm', 'cod_ibge', 'estado_idhm.estado_cod_ibge')
            .leftJoin('estado_estabelecimentos_sus', 'cod_ibge', 'estado_estabelecimentos_sus.estado_cod_ibge');

        if (data.length === 0) {
            console.log('No data found');
            return res.status(404).json({});
        }

        return res.json(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = router;
