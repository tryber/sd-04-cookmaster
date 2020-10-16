require('dotenv').config();
const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  schema: 'cookmaster',
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema;

const connection = () => {
  if (schema) return Promise.resolve(schema);
  return mysqlx
    .getSession(config)
    .then((session) => {
      schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch(() => process.exit(1));
};

module.exports = connection;
