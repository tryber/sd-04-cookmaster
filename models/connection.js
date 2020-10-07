const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let schema;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  schema: 'cookmaster',
  //socketPath: '/var/run/mysqld/mysqld.sock', => não é necessário?
};

const connection = () => (
  schema
    ? Promisse.resolve(schema)
    : mysqlx
        .getSession(config)
        .then((session) => {
          schema = session.getSchema('cookmaster');
          return schema;
        })
        .catch((err) => {
          throw err;
        })
);

module.exports = connection;
