const express = require('express');
const db = require('../db')

const router = express.Router();

router.get('/coverage', async (req, res) => {
    try {
        const data = await db('regiao_vacina')
            .select({
                regiao: 'regiao',
                vacina_id: 'vacina_id',
                ano: 'ano',
                cobertura: 'cobertura',
                doses: 'doses'
            })
            .where('vacina_id', req.query.vaccine)
            .orderBy('ano');

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

module.exports = router;