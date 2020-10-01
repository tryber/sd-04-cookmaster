const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (input) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .select([])
    .where('email = :email')
    .bind('email', input)
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

module.exports = {
  findByEmail,
  findById,
};
