require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const connection = () =>
  mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
      schema: 'cookmaster',
      socketPath: '/var/run/mysqld/mysqld.sock',
    })
    .then((session) => session.getSchema('cookmaster'));
module.exports = connection;
