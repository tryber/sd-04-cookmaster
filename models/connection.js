const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */

const connection = () => (
   schema /* Se schema já existir: */
    ? Promise.resolve(schema) /* Retorna o schema numa Promise: */
    : mysqlx
    .getSession(config) /* Se não, criamos uma nova conexão */
    .then((session) => { /* Quando terminamos de abrir a conexão: */
      schema = session.getSchema('cookmaster'); /* Armazenamos a conexão na variável `schema`*/
      return schema; /* E retornamos o schema de dentro da Promise */
    })
    .catch((err) => { /* Caso um erro ocorra: */
      console.error('Não conectado ao banco de dados.'); /* Exibimos o erro no console */
      process.exit(1); /* E encerramos o processo */
    })
);

module.exports = connection;
