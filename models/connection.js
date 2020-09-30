const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let schema;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = async () => {
  return mysqlx
    .getSession(config)
    .then((session) => session.getSchema('cookmaster'));
};
