require('dotenv/config');

const mysqlx = require('@mysql/xdevapi');

let schema;

const connection = () => (
  schema ?
  Promise.resolve(schema) :
  mysqlx
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
    .catch(() => {
      process.exit(1);
    })
);

module.exports = (connection);
