const connect = require('./connection');
/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) =>
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select('id', 'email', 'password')
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then(
      (rows) =>
        rows.map(([id, userEmail, password]) => ({
          id,
          userEmail,
          password,
        }))[0],
    );

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => connect()
  .then((db) => db
    .getTable('users')
    .select('id', 'email', 'password', 'first_name', 'last_name')
    .where('id = :id')
    .bind('id', userId)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, email, password, name, lastName]) => ({
    id,
    email,
    password,
    name,
    lastName,
    fullName: `${name} ${lastName}`,
  }))[0]);

module.exports = {
  findByEmail,
  findById,
};
