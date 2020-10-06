const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

const connection = async () => {
  return mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
      socketPath: '/var/run/mysqld/mysqld.sock',
    })
    .then((session) => {
     const schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch(() => {
      process.exit(1);
    });
};

module.exports = {
  connection,
};
