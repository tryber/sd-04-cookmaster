const mysqlx = require('@mysql/xdevapi');

let schema;

require('dotenv').config();

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};
/*
const connection = () => {
  return schema
    ? Promise.resolve(schema)
    : mysqlx
        .getSession(config)
        .then((session) => {
          schema = session.getSchema('cookmaster');
          return schema;
        })
        .catch((err) => {
          alert(err);
          process.exit(1);
        });
};
*/
function connection() {
  return schema
    ? Promise.resolve(schema)
    : mysqlx
        .getSession(config)
        .then((session) => {
          schema = session.getSchema('cookmaster');
          return schema;
        })
        .catch((err) => {
          alert(err);
          process.exit(1);
        });
}

module.exports = connection;
