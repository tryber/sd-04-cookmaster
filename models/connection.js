require('dotenv/config');

const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  //socketPath: '/var/run/mysqld/mysqld.sock', => não é necessário?
};

const connection = () => {
  return mysqlx
    .getSession(config)
    .then(async (session) => session.getSchema('cookmaster'))
    .catch((err) => {
      throw err;
    });
};

module.exports = connection;
