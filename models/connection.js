const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */

const config = {
  /* Se não, criamos uma nova conexão */
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  schema: 'cookmaster',
};

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
        .catch((err) => {
          process.exit(1);
          return err;
        });
}
module.exports = connection;
