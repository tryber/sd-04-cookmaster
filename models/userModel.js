/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .select([])
      .where('email = :email')
      .bind('email', email)
      .execute()
      .then((results) => results.fetchOne())
      .then(([id, eMail, password, firstName, lastName]) => ({
        id,
        eMail,
        password,
        firstName,
        lastName,
      })),
  );
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .select([])
      .where('id = :id')
      .bind('id', id)
      .execute()
      .then((results) => results.fetchOne())
      .then(([iD, email, password, firstName, lastName]) => ({
        iD,
        email,
        password,
        firstName,
        lastName,
      })),
  );
};

const createUser = async (email, firstName, lastName, password) => {
  console.log('usuario criado', email);

  return connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values((email, password, firstName, lastName))
      .execute(),
  );
};

const isEmailValid = (email = '') => email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

const isPasswordValid = (password = '') => password.length >= 6;

const isCounterPasswordValid = (password = '', counterPassword = '') =>
  counterPassword === password;

const isUserNameValid = (name = '') => name.length >= 3;

const isUserLastNameValid = (lastName = '') => lastName.length >= 3;

module.exports = {
  findByEmail,
  findById,
  isUserNameValid,
  isUserLastNameValid,
  isPasswordValid,
  isCounterPasswordValid,
  isEmailValid,
  createUser,
};
