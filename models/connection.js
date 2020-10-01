const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

// const config = {
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   host: process.env.HOSTNAME,
//   port: 33060,
//   socketPath: '/var/run/mysqld/mysqld.sock',
// };

const connection = async () =>
  mysqlx
    .getSession({
      user: 'root',
      password: 'ZGMFX20a',
      host: 'localhost',
      port: 33060,
      socketPath: '/var/run/mysqld/mysqld.sock',
    })
    .then((session) => {
      let schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch(() => {
      process.exit(1);
    });

module.exports = {
  connection,
};
