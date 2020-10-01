const connection = require('./connection');

const getUser = (userData) => {
  const [email, password, id] = userData;
  return { email, password, id };
};

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const userData = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['email', 'password', 'id'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) => users[0]);

  if (!userData) return null;

  return getUser(userData);
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const userData = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['email', 'password', 'id'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) => users[0]);

  if (!userData) return null;

  return getUser(userData);
};

module.exports = {
  findByEmail,
  findById,
};
