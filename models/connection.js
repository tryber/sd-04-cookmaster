const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const connection = () => {
  return mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
      //socketPath: '/var/run/mysqld/mysqld.sock',
      //dialect: 'mysql',
    })
    .then((session) => {
      schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;