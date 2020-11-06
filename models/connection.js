const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let schema;

const connection = () => {
  schema
    ? Promise.resolve(schema)
    : mysqlx
        .getSession({
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          host: process.env.HOSTNAME,
          port: 33060,
          schema: 'cookmaster',
        })
        .then((session) => {
          schema = session.getSchema('cookmaster');
          return schema;
        })
        .catch((err) => {
          throw err;
        });
};

module.exports = connection;
