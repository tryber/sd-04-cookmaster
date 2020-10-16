const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailParam) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('email = :email').bind('email', emailParam).execute();

  const user = result.fetchOne();

  if (!user) return null;

  const [id, email, password, name, lastName] = user;

  return { id, email, password, name, lastName };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idParam) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :id').bind('id', idParam).execute();

  const user = result.fetchOne();

  if (!user) return null;

  const [id, email, password, name, lastName] = user;

  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
