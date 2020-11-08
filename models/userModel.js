const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (userEmail) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'email', 'password'])
    .where('email = :email')
    .bind('email', userEmail)
    .execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, email, password]) => ({
    id,
    email,
    password,
  }))[0];

  return list;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', userId)
    .execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, email, password, firstName, lastName]) => ({
    id,
    email,
    password,
    firstName,
    lastName,
  }))[0];

  return list;
};

const editUser = async (id, email, password, firstName, lastName) => {
  const db = await connection();
  await db
    .getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', firstName)
    .set('last_name', lastName)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  editUser,
};
