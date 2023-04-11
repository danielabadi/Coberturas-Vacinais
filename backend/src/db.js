const db = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '03051999',
    database: 'vacinacao',
  },
  searchPath: ['geodata', 'public'],
});

module.exports = db;
