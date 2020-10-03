const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailInput) => {
  const db = await connection();
  const table = await db
    .getTable('users');
  const result = await table
    .select([])
    .where('email = :email')
    .bind('email', emailInput)
    .execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idInput) => {
  const db = await connection();
  const table = await db
    .getTable('users');
  const result = await table
    .select([])
    .where('id = :id')
    .bind('id', idInput)
    .execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

const createNewUser = async ({ email, password, name, lastName }) => {
  const db = await connection();
  const createUser = await db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, name, lastName)
    .execute();
  return createUser;
};

module.exports = {
  findByEmail,
  findById,
  createNewUser,
};
