require('dotenv').config();
const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: 'var/run/mysqld/mysqld.sock',
};

let schema;

const connection = () => (
  schema
    ? Promise.resolve(schema)
    : mysqlx
      .getSession(config)
      .then(async (session) => {
        schema = await session.getSchema('cookmaster');
        return schema;
      })
      .catch(() => {
        process.exit(1);
      })
);

module.exports = connection;
