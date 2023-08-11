const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'WP_RFP',
  password: 'passw0rd',
  port: 5432,
});

module.exports = pool;