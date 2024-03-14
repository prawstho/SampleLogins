const Pool = require('pg').Pool
const pool = new Pool({
  user: 'peter',
  host: 'localhost',
  database: 'Auth',
  password: 'royisanerd',
  port: 5434,
});

if(DEBUG) console.log("connected to PostgreSQL...");

module.exports = pool;