// copiei do https://github.com/tryber/sd-04-cookmaster/blob/gregorha-cookmaster/models/connection.js
const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  db: process.env.MYSQL_DB,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};
// got cry
const connection = () =>
  mysqlx
    .getSession(config)
    .then((session) => session.getSchema('cookmaster'))
    .catch((err) => err);

module.exports = connection;
