const mysqlx = require('@mysql/xdevapi');
require('dotenv/config'); // para uso do dotenv

// const config = {
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   host: process.env.HOSTNAME,
//   db: process.env.MYSQL_DB,
//   port: 33060,
//   socketPath: '/var/run/mysqld/mysqld.sock',
// };

function connection() {
  return mysqlx
    .getSession({
      user: 'root',
      password: '292311',
      host: 'localhost',
      port: 33060,
      schema: 'cookmaster',
    })
    .then((session) => session.getSchema('cookmaster'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = connection;
