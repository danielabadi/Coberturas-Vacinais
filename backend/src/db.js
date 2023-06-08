const db = require('knex')({
    client: 'pg',
    connection: {
        host: '',
        user: '',
        password: '',
        database: 'vacinacao',
    },
    searchPath: ['geodata', 'public'],
});

module.exports = db;
