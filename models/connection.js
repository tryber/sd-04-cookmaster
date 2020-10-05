// copiado https://github.com/tryber/sd-03-project-cookmaster/blob/lul-is-project-cookmaster/models/connection.js
// motivos o CC não ta aceitando minhas push
const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let connection;

module.exports = () =>
  connection
    ? Promise.resolve(connection)
    : mysqlx
        .getSession({
          host: process.env.HOSTNAME,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          port: '33060',
          socketPath: '/var/run/mysqld/mysqld.sock',
        })
        .then(async (session) => {
          connection = await session.getSchema('cookmaster');
          return connection;
        })
        .catch(() => {
          process.exit(1);
        });
