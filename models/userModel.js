const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} emailParam Email do usuário a ser encontrado
 */
const findByEmail = async (emailParam) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .select([])
    .where('email = :email_param')
    .bind('email_param', emailParam)
    .execute();
  const user = result.fetchOne();
  if (!user) return null;
  const [id, email, password, firstName, lastName] = user;
  return { id, email, password, firstName, lastName };
};
/**
 * Busca um usuário através do seu ID
 * @param {string} idParam ID do usuário
 */
const findById = async (idParam) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :param_id').bind('param_id', idParam).execute();
  const user = result.fetchOne();
  const [id, email, password, firstName, lastName] = user;
  return { id, email, password, firstName, lastName };
};
/**
 * Adiciona um usuário
 * @param {string} email Email do usuário
 * @param {string} password Password do usuário
 * @param {string} firstName Primeiro nome do usuário
 * @param {string} lastName Sobrenome do usuário
 */
const addUser = async (firstName, lastName, email, password) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
  return result.getWarningsCount();
};

/**
 * Deleta um usuário através do seu ID
 * @param {string} idParam ID do usuário
 */
const deleteUser = async (idParam) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.delete().where('id = :param_id').bind('param_id', idParam).execute();
  return result.getWarningsCount();
};

const updateUser = async (id, email, password, firstName, lastName) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .update()
    .set('first_name', firstName)
    .set('last_name', lastName)
    .set('email', email)
    .set('password', password)
    .where('id = :param_id')
    .bind('param_id', id)
    .execute();
  return result.getWarningsCount();
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  deleteUser,
  updateUser,
};
