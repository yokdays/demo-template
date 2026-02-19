const sql = require('mssql');
const env = require('./env');

const config = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  server: env.DB_SERVER,
  database: env.DB_NAME,
  options: {
    encrypt: env.DB_ENCRYPT === 'true',
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

async function getPool() {
  if (pool) return pool;

  try {
    pool = await sql.connect(config);
    console.log('SQL Server connected');
    return pool;
  } catch (err) {
    console.error('Database connection failed', err);
    throw err;
  }
}

module.exports = { sql, getPool };