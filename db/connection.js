const pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

module.exports = pool;
