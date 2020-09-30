const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'email', 'password'])
    .where('email = :email')
    .bind('email', email)
    .execute();

  /* The method fetches all (or all remaining) rows of a query result set
  and returns a list of tuples. If no more rows are available, it returns
  an empty list. */
  const user = await results
    .fetchAll()
    .then((list) => list[0].reduce(([id, userEmail, password]) => ({ id, userEmail, password })));

  return user;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'email', 'password'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const user = await results
    .fetchAll()
    .then((list) => list[0].reduce(([userId, email, password]) => ({ userId, email, password })));

  return user;
};

module.exports = {
  findByEmail,
  findById,
};
