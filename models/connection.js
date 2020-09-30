require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

function connection() {
  return mysqlx
    .getSession(config)
    .then(function (session) {
      return session.getSchema('cookmaster');
    })
    .catch(function (err) {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
