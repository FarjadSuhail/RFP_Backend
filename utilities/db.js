const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'UsmanAslam@12345',
  port: 4000,
});

module.exports = pool;