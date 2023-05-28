const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/coverage', async (req, res) => {
    try {
        const data = await db('municipio_vacina')
            .select({
                cod_ibge: 'municipio_cod_ibge',
                cobertura: 'cobertura',
                ano: 'ano',
                nome: 'nome'
            })
            .where('municipio_cod_ibge', req.query.city)
            .orderBy('ano')
            .leftJoin('vacina', 'vacina_id', 'id_vacina');

        if (data.length === 0) {
            console.log('No data found');
            return res.status(404).json([]);
        }

        return res.json(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get('/info', async (req, res) => {
    try {
        const data = await db('municipio')
            .select({
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
            .leftJoin('idhm', 'cod_ibge', 'municipio_cod_ibge')
            .leftJoin('estabelecimentos_sus', 'cod_ibge', 'estabelecimentos_sus.municipio_cod_ibge')
            .where('cod_ibge', req.query.city);

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

router.get('/population', async (req, res) => {
    try {
        const data = await db('pop_municipio')
            .select({
                cod_ibge: 'municipio_cod_ibge',
                ano: 'ano',
                populacao: 'pop'
            })
            .where('municipio_cod_ibge', req.query.city)
            .orderBy('ano');

        if (data.length === 0) {
            console.log('No data found');
            return res.status(404).json({});
        }

        return res.json(...data.slice(-1));

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


router.get('/pib', async (req, res) => {
    try {
        const data = await db('pib')
            .select({
                cod_ibge: 'municipio_cod_ibge',
                ano: 'ano',
                pib: 'pib',
                pib_per_capita: 'pib_per_capita',
            })
            .where('municipio_cod_ibge', req.query.city)
            .orderBy('ano')
            .table('pib');

        if (data.length === 0) {
            console.log('No data found');
            return res.status(404).json({});
        }

        return res.json(...data.slice(-1));

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
});

router.get('/map_coverage', async (req, res) => {
    try {
        const data = await db('municipio_vacina')
            .select({
                cod_ibge: 'municipio_cod_ibge',
                cobertura: 'cobertura',
                doses: 'doses'
            })
            .where('vacina_id', req.query.vaccine)
            .where('ano', req.query.year);

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

module.exports = router;
