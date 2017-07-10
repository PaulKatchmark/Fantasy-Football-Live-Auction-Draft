const pg = require('pg');
const url = require('url');
var bcrypt= require('bcrypt');
var config={};

if(process.env.DATABASE_URL != undefined) {
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: process.env.SSL
  };
} else {
  config = {
    database: 'rho'
  };
}

var pool = new pg.Pool(config);

module.exports = pool;