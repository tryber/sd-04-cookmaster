const crypto = require('crypto');
const connection = require('./connections');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'Taylor',
  lastName: 'Doe',
};

/**
 * Create user password hash
 * @param {string} password - User password
 */
const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('base64');

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
        .bind('password', hashPassword(userPassword))
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
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((userLogin) =>
      userLogin.map(([email, firstName, lastName]) => ({
        email,
        firstName,
        lastName,
      })));

  return userData || null;
};

module.exports = {
  user,
  userById,
};
