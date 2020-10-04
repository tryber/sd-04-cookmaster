// const crypto = require('crypto');
const connection = require('./connections');

/**
 * Create user password hash
 * @param {string} password - User password
 */
// const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('base64');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 * @param {string} password User password
 */
const user = async (userEmail, userPassword) => {
  const userData = await connection()
    .then((schema) =>
      schema
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email AND password = :password')
        .bind('email', userEmail)
        .bind('password', userPassword)
        .execute())
    .then((result) => result.fetchAll())
    .then((userLogin) =>
      userLogin.map(([id, email, password, firstName, lastName]) => ({
        id,
        email,
        password,
        firstName,
        lastName,
      })));

  return userData || null;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const userById = async (id) => {
  const userData = await connection()
    .then((schema) =>
      schema
        .getTable('users')
        .select(['email', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute())
    .then((result) => result.fetchAll())
    .then((userLogin) =>
      userLogin.map(([email, firstName, lastName]) => ({
        id,
        email,
        firstName,
        lastName,
      })));

  return userData || null;
};

const create = async ({ email, password, firstName, lastName }) => {
  const result = await connection().then((schema) =>
    schema
      .getTable('users')
      .insert(['email', 'password', 'first_Name', 'last_Name'])
      .values(email, password, firstName, lastName)
      .execute());

  return result || null;
};

module.exports = {
  user,
  userById,
  create,
};
