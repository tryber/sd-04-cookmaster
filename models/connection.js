const mysqlx = require('@mysql/xdevapi');

require('dotenv/config');

const connection = () => (
  mysqlx.getSession({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.HOSTNAME,
    port: 33060,
    schema: 'cookmaster',
    socketPath: '/var/run/mysqld/mysqld.sock',
  })
  .then((session) => session.getSchema('cookmaster'))
  .catch(() => process.exit(1))
);

module.exports = connection;
