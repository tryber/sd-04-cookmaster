const mysqlx = require('@mysql/xdevapi');

// require('dotenv').config();
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema;

const connection = async () => {
  if (schema) return Promise.resolve(schema);
  return mysqlx.getSession(config).then((session) => {
    schema = session.getSchema('cookmaster');
    return schema;
  });
};

module.exports = connection;
