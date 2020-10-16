const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

/**
 * Mysql connection parameters
 */
const config = {
  database: 'cookmaster',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema;
/**
 * Mysql DB connection function
 * return schema - Schema connection session
 * return error - Schema connection error
 */
const connection = () => (schema /* Se schema já existir: */
  ? Promise.resolve(schema)
  : mysqlx
    .getSession(config)
    .then((session) => {
      schema = session.getSchema(config.database);

      return schema;
    })
    .catch(() => {
      process.exit(1);
    }));
module.exports = connection;
