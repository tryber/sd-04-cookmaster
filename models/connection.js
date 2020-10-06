const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};
/*
const connection = async () => {
  return mysqlx
    .getSession(config)
    .then((session) => {
      const schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      // console.log(err);
      process.exit(err);
    });
};
*/
function connection() {
  return mysqlx
    .getSession(config)
    .then((session) => {
      const schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      process.exit(err);
    });
}

module.exports = connection;
