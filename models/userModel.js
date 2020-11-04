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

// /**
//  * Busca um usuário através do seu email e, se encontrado, retorna-o.
//  * @param {string} email Email do usuário a ser encontrado
//  */

const findByEmail = async (userEmail) => {
  const user = await connection()
    .then((db) =>
      db.getTable('users').select([]).where('email = :email').bind('email', userEmail).execute(),
    )
    .then((results) => results.fetchOne())
    .catch((err) => {
      throw err;
    });

  const [id, email, password, firstName, lastName] = user;

  return { id, email, password, firstName, lastName };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */

const findById = async (userId) => {
  const user = await connection()
    .then((db) => db.getTable('users').select([]).where('id = :id').bind('id', userId).execute())
    .then((results) => results.fetchOne());

  const [id, email, password, firstName, lastName] = user;

  return { id, email, password, firstName, lastName };
};

const addUser = async (email, password, firstName, lastName) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute(),
  );
};

const isValidEmail = (email) => {
  if (email === '') return false;

  return true;
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  isValidEmail,
};
