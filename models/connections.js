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

/**
 * Mysql DB connection function
 * return schema - Schema connection session
 * return error - Schema connection error
 */
// const connection = async () => {
//   let schema = null;

//   return schema || mysqlx
//     .getSession(config)
//     .then((session) => {
//       schema = session.getSchema(config.database);

//       return schema;
//     })
//     .catch(() => {
//       process.exit(1);
//     });
// };

// module.exports = connection;

let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */
const connection = () => (schema /* Se schema já existir: */
  ? Promise.resolve(schema) /* Retorna o schema numa Promise: */
  : mysqlx
    .getSession(config)
    .then((session) => {
      /* Quando terminamos de abrir a conexão: */
      schema = session.getSchema(config.database); /* Armazenamos a conexão na variável `schema` */
      return schema; /* E retornamos o schema de dentro da Promise */
    })
    .catch(() => {
      /* Caso um erro ocorra: */
      process.exit(1); /* E encerramos o processo */
    }));
module.exports = connection;
