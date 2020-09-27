const mysqlx = require('@mysql/xdevapi');

require('dotenv').config();

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const connection = async () =>
  mysqlx
    .getSession(config)
    .then((session) => session.getSchema('cookmaster'))
    .catch((err) => console.log(err.message));

module.exports = connection;
