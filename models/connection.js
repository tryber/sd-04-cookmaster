require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */
function connection() {
  return schema /* Se schema já existir: */
    ? Promise.resolve(schema) /* Retorna o schema numa Promise: */
    : mysqlx
        .getSession(config)
        .then((session) => {
          /* Quando terminamos de abrir a conexão: */
          schema = session.getSchema('cookmaster'); /* Armazenamos a conexão na variável `schema`*/
          return schema; /* E retornamos o schema de dentro da Promise */
        })
        .catch(() => {
          /* Caso um erro ocorra: */
          process.exit(1); /* E encerramos o processo */
        });
}

/* function connection() {
  return mysqlx
    .getSession(config)
    .then(function (session) {
      return session.getSchema('cookmaster');
    })
    .catch(function () {
      process.exit(1);
    });
} */

module.exports = connection;
