require('dotenv').config();
const mysqlx = require('@mysql/xdevapi');

let schema;
const connection = () => {
  return schema ?
    Promise.resolve(schema) :
    mysqlx.getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
      socketPath: '/var/run/mysqld/mysqld.sock',
    })
    .then((session) => {
      schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      process.exit();
    });
};

module.exports = connection;
