require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const connection = () => 
  mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
    })
    .then((session) => session.getSchema('cookmaster')
    )
    .catch((err) => {
      console.error(`deu ruim ${err}`);
      process.exit(1);
    });
;

module.exports = (connection);
