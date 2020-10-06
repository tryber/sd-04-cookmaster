const connection = require('./connection');


/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  // connection() retorna uma PROMISE
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({ id, email, password, firstName, lastName }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id_param')
        .bind('id_param', id)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({ id, email, password, firstName, lastName }));
};

module.exports = {
  findByEmail,
  findById,
};
