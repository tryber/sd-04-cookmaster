const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const mysqlx = require('@mysql/xdevapi');

const conn = async () =>
  mysqlx
    .getSession(config)
    .then((session) => session.getSchema('cookmaster'))
    .catch((err) => console.log(err.message));


module.exports = conn;
